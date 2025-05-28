import React, { useEffect, useReducer,  } from "react";
import {
    ChartContainer,
    ChartButtonsContainer,
    ChartOptionButton
} from "./QueryChart.elements";
import 'luxon';
import 'chartjs-adapter-luxon';
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2';

const initialState={
    chartOptions:{
        scales:{
            y: {
                min:0,
                ticks: {
                    beginAtZero:true,
                    stepSize: 1,
                }
            },
        }
        
    },
    chartData:{
        datasets:[],
        type:"line"
    },
    chartPlugin:{
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
    },
    selectedChartOption:null
}

/**
 * 
 * @param {Function} queryFunction The function that is used to populate the chart data 
 * @param {Object} chartOptions A valid set of options for chartjs
 * @param {Object} chartPlugin A valid set of options for the chart plugin for chartjs
 * @returns a rendered chart displaying data from the provided query function
 */
export default function QueryChart(props){
    const reducer = (state,action)=>{
        switch(action.type){
            case "setOptions":
                return {...state,chartOptions:action.payload}
            case "setData":
                return {...state,chartData:action.payload}
            case "setChartPlugin":
                return {...state,chartPlugin:action.payload}
            case "setSelectedChartOption":
                return{...state,selectedChartOption:action.payload}
            default:
                return{...state};
        }
    }
    
    const [state,dispatch] = useReducer(reducer,initialState)


    useEffect(()=>{
        if(props.initialOptions)
        {
            dispatch({type:"setOptions",payload:props.initialOptions});
        }
        if(props.initialPlugin){
            dispatch({type:"setChartPlugin",payload:props.initialPlugin});
        }
        if(props.chartOptions){
            dispatch({type:"setSelectedChartOption",payload:props.chartOptions[0]});
        }
        if(props.initialData){
            dispatch({type:"setData",payload:props.initialData});
        }
        
    },[])

    useEffect(()=>{
        getChartData()
    },[state.selectedChartOption])


    async function getChartData(){
        if(props.getData){
            const option = state.selectedChartOption;
            let dataObj = await props.getData(option);
            if(option !== state.selectedChartOption){
                return;
            }
            if(dataObj.data){
                let newData = {
                    datasets:dataObj.data
                }
                dispatch({type:"setData",payload:newData});
            }
            if(dataObj.options){
                dispatch({type:"setOptions",payload:dataObj.options});
            }
            if(dataObj.plugins){
                dispatch({type:"setPlugins",payload:dataObj.plugins});
            }
        }
    }

    function handleOptionSelect(option){
        dispatch({type:"setSelectedChartOption",payload:option});
    }
    

    return (
        <ChartContainer>
            {props.chartOptions && 
                <ChartButtonsContainer>
                {props.chartOptions.map((option)=>{
                    return (<ChartOptionButton onClick={()=>handleOptionSelect(option)}>{option}</ChartOptionButton>)
                })}
                </ChartButtonsContainer>
            }
            {state.chartData && (
                <Chart
                data={state.chartData}
                plugins={[state.chartPlugin]}
                options={state.chartOptions}
                fallbackContent={state.chartData.fallbackContent || "A chart displaying data"}
                />
            )}
        </ChartContainer>
    )
}