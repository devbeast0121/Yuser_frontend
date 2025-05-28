import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import 'luxon';
import 'chartjs-adapter-luxon';
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2';


export default function QueryChart({query,store}){
    const [selectedOption,setSelectedOption] = useState(query.options[0]);
    const [results,setResults] = useState({
        type:'line',
        datasets:[]
    })
    const [chartOptions, setOptions] = useState({
        scales: {
            y: {
                min:0,
                ticks: {
                    beginAtZero:true,
                    stepSize: 1,
                }
            },
        },
    })
    const [inputs, setInputs] = useState({})
    
      useEffect(()=>{
        query?.chartInputs?.map((input)=>{
            setInputs({...inputs, [input]:null})
        })
      },[])

    useEffect(async ()=>{
        await runQuery()

    },[selectedOption]);

    const runQuery = async () => { 
        let jobData = {option:selectedOption,start:inputs.Start,end:inputs.End};
        let {data,options} =  await store.adminDashboardInterface(query.job_id,jobData);
        let dataObj = {
            datasets: data
        }
        options && setOptions(options);
        setResults(dataObj);
        
    }

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    return (
        results &&(
            <div style={{maxHeight:"350px",maxWidth:'500px',flexDirection:"column"}}>
                <div style={{flexDirection:"row"}}>
                    {query.options.map((param, index) => 
                    <button style={{backgroundColor:"purple", marginRight:"5px",marginBlock:"5px", borderRadius:"5px", border:'none'}} onClick={()=>setSelectedOption(param)} >
                        {param}
                    </button>)}
                    <div style = {{flexDirection:"row"}}>
                        <div style = {{flexDirection:"column"}}>
                        {query?.chartInputs?.map((option)=>{
                            return(
                            <input 
                                type="text"
                                placeholder={option}
                                onChange={(e)=>{setInputs({...inputs,[option]:e.target.value})}} 
                                style={{ backgroundColor: '#777', caretColor:"#fff" }}
                            /> )
                        })
                        }
                        </div>
                        {query?.chartInputs && 
                            <button onClick={runQuery} style = {{backgroundColor: '#999', margin:"5px"}}>
                                {"Submit"}
                            </button>
                        }
                        </div>
                </div>
                <Chart
                    data={results}
                    plugins={[plugin]}
                    options={chartOptions}
                    fallbackContent={results.fallbackContent ?? "A chart displaying data"}
                />
                
            </div>
        )

    )
}