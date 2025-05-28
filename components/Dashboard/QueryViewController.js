import React from 'react'
import QueryController from "./QueryController";
import QueryView from "./QueryView";
import Column from './Column';
import QueryChart from './QueryCharts';

/*
    QueryViewController()
    The component that handles the interaction with the query. Both Viewing and modifying state
    William Doyle
    April 7th 2022
*/
export default function QueryViewController({ query, store }) {
    const [results, setResults] = React.useState(null);
    return <div className="AdminDashboard-QueryViewController">
        {query.type !== "chart" && 
            <Column children={
                [<article>
                    {query.description}
                </article>,
                <QueryController query={query} store={store} setResults={setResults} />,
                <QueryView query={query} results={results} />
                ]
            } />
        }
        {query.type === "chart" &&
            <Column children={
                [<article>
                    {query.description}
                </article>,
                <QueryChart query = {query} store = {store}/>
                ]
            } />
         }
    </div>
}