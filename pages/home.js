import React from "react";
import { inject, observer } from "mobx-react";
import { getSession, useSession } from "next-auth/client";
import LandingComponent from '../components/LandingComponent/LandingComponent';
import NewLandingComponent from "../components/NewLandingComponent/NewLandingComponent";


export default inject("store")(
    observer(function HomeLanding(props) {
        const [session, loading] = useSession()

        return (
            <>
                {
                    session &&
                    <NewLandingComponent />

                }
            </>
        );
    })
);

export async function getServerSideProps(context) {
    const session = await getSession(context)

    // if (session === null)
    //     console.warn(`⚠️ ⚠️ ⚠️ ⚠️ /pages/profile.js :: getServerSideProps() -> session is null meaning no session exists ⚠️ ⚠️ ⚠️ ⚠️`);




    // const posts = LocalPosts.getInstance().posts_profile;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session: session,
            // posts: posts,
        }
    }
}