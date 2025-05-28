import React from "react";
import { inject, observer } from "mobx-react";
import { useStore } from "../stores/RootStore";
import { getSession, useSession } from "next-auth/client";
import NewLandingComponent from "../components/NewLandingComponent/NewLandingComponent";


export default inject("store")(
    observer(function Home(props) {
        const rootstore = useStore();
        const [session, loading] = useSession();


        return (
            <>
                {
                    session ? (
                        <NewLandingComponent />
                    )
                        : null
                }
            </>
        );
    })
);

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session: session,
        },
    };
}
