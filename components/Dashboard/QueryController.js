import React from "react";
import { Colorizer } from "../../stores/ClassTools";
import { useStore } from "../../stores/RootStore";
import axios from 'axios';
import * as crypto from 'crypto';
import Linkify from 'react-linkify';
import { getSession } from 'next-auth/client'
import {hash, hashImageAtUrl} from './functions'
import Column from "./Column";


/*
    QueryController()
    The component that handles the interaction with the query
    William Doyle
    April 7th 2022
*/
export default function QueryController({ query, store, setResults }) {
    const [inputs, setInputs] = React.useState({});

    /*
        localFunction
        April 2022
        William Doyle
        MUST RETURN AN ARRAY OF OBJECTS
    */
    async function localFunction(job_id, inputs) {
        //console.log(inputs)
        switch (job_id) {
            case '3':
                return [{ date: new Date(parseInt(inputs.timestamp)).toLocaleString() }];
            case '4':
                // get the hash of an image at a given url (inputs.url)
                const hash = await hashImageAtUrl(inputs.url);
                return [{ hash }];
            default:
                return null;
        }
    }

    async function runQuery(job_id) {
        const result = await (async () => {
            if (!query.local)
                return await store.adminDashboardInterface(job_id, inputs);
            return await localFunction(job_id, inputs);
        })();
        setResults(result);
    }

    return <div className="AdminDashboard-QueryController" style={{}}>
        <table border='1'>
            {
                query.expectedParams.map((param, index) => <tr>
                    <td>{param}</td>
                    <td><input
                        type="text"
                        onChange={(e) => setInputs({ ...inputs, [param]: e.target.value })}
                        style={{ backgroundColor: '#777',caretColor:'#fff' }}
                    /></td>
                </tr>)
            }

            {
                query.selectionNames?.map((param,index)=>{
                    if(!inputs[param]){
                        setInputs({...inputs,[param]:query.selectionOptions[index][0]});
                    }
                    return(
                    <>
                        <td>{param}</td>
                        <select onChange={(e)=>{setInputs({...inputs,[param]:query.selectionOptions[index][e.target.selectedIndex]})}}>
                            {query.selectionOptions[index].map((opt,index)=>
                                <option selected={index === 0}>{opt}</option>

                            )}
                        </select>
                    </>
                )})
            }

        </table>
        <button
            onClick={() => runQuery(query.job_id)}
            style={{ backgroundColor: '#999' }}
        >Run Query</button>
        <button
            onClick={()=>setResults([])}
            style={{ backgroundColor: '#999' }}
        >Clear Results</button>
    </div>
}