import React, { useState } from 'react';
//import PostsList from '.././PostsList/';
import NavFeed from '.././NavFeed/NavFeed';
import LoginBoxSidebar from '.././LoginBox/LoginBoxSidebar';
import { inject, observer } from 'mobx-react';
import RootStore, { useStore } from "../../stores/RootStore";
import ProfileInfoBox from '.././ProfileInfoBox/ProfileInfoBox';
import SignupPromo from '.././SignupPromo/SignupPromo';
import Footer from '.././Footer/Footer';
import {
    Container,
    SideBarLeft,
    SideBarLeftInner,
    SideBarRight,
    SideBarLeftBlock
} from "../../styles/globalStyles";


import { useSession, getSession } from 'next-auth/client'
import PostsList from '../PostsList/PostsList';

const USER_IDS = {
    cyclops: "5b6c9ae8e5aa585c996f0bd3",
    wolverine: '5b87f9134f7cd52938eec31b',
    zaza: "5b6dfaff7810b303df2a5e5f",
};

export default inject('store')(observer(
    function ProfileMain(props) {

        const rootstore = useStore();

        const [session, loading] = useSession()

        // console.log(props)

        //   const [posts, setPosts] = React.useState([]);

        // React.useEffect(() => {

        //     async function doEffect() {
        //         await props.store.getUserPosts()
        //     }
        //     doEffect();
        //     //            async function LoadPosts() {
        //     //                const tposts = await rootstore.getUserPosts(USER_IDS.cyclops, 0);
        //     //       const tposts = await rootstore.getSpecificUserPosts(USER_IDS.cyclops, 0);
        //     //     const tposts_2 = await rootstore.getSpecificUserPosts(USER_IDS.zaza, 0);

        //     //                const combined = [...tposts?.data, ...tposts_2?.data];
        //     //              combined.sort((a, b) => b.createdAt - a.createdAt);

        //     //setPosts(tposts?.data);
        //     //                setPosts(combined);
        //     //          }

        //     //            LoadPosts();
        // }, [rootstore.authStore.isAuthenticated, props.store]);

        //TODO:  const btnText = rootstore.isAuthenticated._id == ProfileContainer.user._id ? "Edit Profile" : "Follow"
        //TODO:  const btnColor =  rootstore.isAuthenticated._id == ProfileContainer.user._id ? false : true

        return (
            <>
                <Container>
                    <SideBarLeft>
                        <SideBarLeftInner>
                            <NavFeed />
                            < SideBarLeftBlock>
                                {!session &&
                                    <>
                                        <SignupPromo
                                            title={'shape the future'}
                                            text={'of social media'}
                                        />
                                        <LoginBoxSidebar
                                            title={'Login to yuser'}
                                            textOne={'Login access features in the yuser Web app.'}
                                            textTwo={"Don't have an account? Check out our discord for invites"}
                                        />
                                    </>
                                }
                                <Footer />
                            </SideBarLeftBlock>
                        </SideBarLeftInner>
                    </SideBarLeft>
                    <SideBarRight>
                        <ProfileInfoBox user={props?.props?.session?.user} />
                        <PostsList
                            posts={props?.props?.posts}
                            profile={true}
                        />
                    </SideBarRight>
                </Container>
            </>
        )
    }
))