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
    QueryView()
    The component that handles displaying the query and related details
    William Doyle
    April 7th 2022
*/
export default function QueryView({ query, results }) {

    // used to make Linkify open in new tab
    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return <div className="AdminDashboard-QueryView" style={{}}>
        {
            (() => {
                if (results === null)
                    return <></>
                return <>
                    <Column children={
                        results.map((result, rindex) => <div style={{marginTop:10}}>
                            <table border='1'>
                                {
                                    Object.keys(result).sort().map((key, index) => <tr>
                                        <td>{key}</td>
                                        {
                                            (() => {
                                                if (typeof result[key] !== 'object')
                                                    return <td><Linkify componentDecorator={componentDecorator}>{result[key]?.toString()}</Linkify></td>
                                                return <td>
                                                    {JSON.stringify(result[key] ?? {}, null, 1)}
                                                </td>
                                            })()
                                        }
                                    </tr>)
                                }
                            </table>
                        </div>)
                    } />
                </>
            })()
        }
    </div>
}