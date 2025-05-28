import React from "react";
import { Colorizer } from "../stores/ClassTools";
import { useStore } from "../stores/RootStore";
import { getSession } from 'next-auth/client'
import QueryViewController from "../components/Dashboard/QueryViewController"
import { reducer, initialState } from "../components/Dashboard/reducer"

/*
    loadOptions()
    returns the options for the admin dashboard
    William Doyle
    April 7th 2022
*/
async function loadOptions(store) {
    return await store.loadAdminDashboardOptions();
}

/*
    AdminDashboard()
    The page used by admins to run queries and view data
    William Doyle
    April 6th 2022
*/
export default function AdminDashboard(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const store = useStore();

    React.useEffect(async () => {
        if (props.session)
            dispatch({ type: "setAuthUser", payload: await store.getAuthUser() })
    }, [props.session])

    React.useEffect(() => { // load the data describing the dashboard features
        if (!props.session)
            return
        const f = async () => dispatch({ type: "setOptions", payload: await loadOptions(store) });
        f();
    }, [props.session]);

    return <div className="AdminDashboard">
        <div className="AdminDashboard-Options">
            <table border='1'>
                <tr>
                    <th>Admin Dashboard</th>
                </tr>
                {
                    state.options.map((option, index) => <tr>
                        <td>
                            <QueryViewController query={option} key={index} store={store} />
                        </td>
                    </tr>)
                }
            </table>
        </div>
    </div>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }
    if (session?.user?.isMod !== true)
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };

    return {
        props: {
            session: session,
        }
    }
}