import React, { useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import Loader from './api/posts'
import LocalPosts from '../stores/LocalPosts'
import { inject, observer } from 'mobx-react';
import {
    ProfileInfoBox,
    SignupPromo,
    LoginBoxSidebar,
    GridThreeCells,
    Footer,
    TabComponentTwo
} from "../components";
import { MessageAppComponent } from '../components/MessageAppComponent/MessageAppComponent';
import { Message } from '../components/Message/Message';
import {
    Container,
    SideBarLeftBlock,
    RightContainer,
    RightContainerInner,
    MiddleContainer
} from "../styles/globalStyles";
import { useStore } from '../stores/RootStore';
import { Router, useRouter } from 'next/router'
import Image from "../public/images/nextGemsLaunchBanner.jpg";
import styled from 'styled-components';
import { COLORS, SPACING } from '../styles/Styling';

export default inject('store')(observer(
    function ProfileMain(props) {
        const [authUser, setAuthUser] = useState(null);
        const [messageVisible, setMessageVisible] = useState(false)
        const [message, setMessage] = useState('')
        const [messageType, setMessageType] = useState('')
        const [messageSingleVisible, setSingleMessageVisible] = useState(false)
        const rootstore = useStore();
        const [posts, setPosts] = useState([])
        const [nfts, setNfts] = useState([]);

        //const postsListExist = posts.length == 0  ? false : true;
        //const [postFeedActive, setPostFeedActive] = useState(postsListExist);
        // const [nftFeedActive, setNftFeedActive] = useState(postsListExist ? false: true);
        const [postFeedActive, setPostFeedActive] = useState(true)
        const [nftFeedActive, setNftFeedActive] = useState(false)


        const [hasMoreNft, setHasMoreNft] = useState(true)
        const router = useRouter()

        //showing the app message (inform/success/error)   Working example: settings.js,  Natalia
        const showAppMessage = (isVisible, type, message) => {
            if (isVisible) {
                setMessageVisible(isVisible)
                setMessageType(type)
                setMessage(message)
                const timer = setTimeout(() => {
                    setMessageVisible(false)
                    setMessageType('')
                    setMessage('')
                }, 3000)
                return () => clearTimeout(timer)
            } else {
                setMessageVisible(isVisible)
                setMessageType('')
                setMessage('')
            }
        }

        React.useEffect(async () => {
            if (props.session) {
                let user = await rootstore.getAuthUser();
                setAuthUser(user);

            }
        }, [props.session])

        React.useEffect(() => {
            async function doEffect() {
                if (props?.session && authUser) {
                    await Loader.LoadProfile(authUser?._id, false, false, {
                        current_length: LocalPosts.getInstance().posts_profile.length,
                    });
                    const postsFetched = LocalPosts.getInstance().posts_profile;
                    setPosts(postsFetched)
                }
            }
            doEffect();
        }, [authUser, posts, router]);
        // console.log(posts,"the posts fetched")
        // console.log(session.user,"user inside session")



        React.useEffect(async () => {
            await fetchUserNFTs();
        }, [authUser]);

        async function fetchUserNFTs() {
            if (authUser !== null) {
                let tempNFTArray = nfts;
                let NFTbatch = await rootstore.getUserNFTsFromUserId(authUser?._id, nfts.length, 6);
                setNfts([...nfts, ...NFTbatch]);
                if (NFTbatch.length === 0) {
                    setHasMoreNft(false);
                }
                else {
                    setHasMoreNft(true);
                }
            }
            else {
                setHasMoreNft(false);
            }
        }


        return (
            <Container>
                {props?.session && authUser &&
                    <MiddleContainer  >
                        <ProfileInfoBox
                            user={authUser}
                        />
                        <TabWrapper>
                            <TabComponentTwo
                                leftText={"POSTS"}
                                rightText={"NFT's"}
                                setLeftSide={setPostFeedActive}
                                setRightSide={setNftFeedActive}
                                leftSide={postFeedActive}
                                rightSide={nftFeedActive}
                                margin={true}
                            />
                        </TabWrapper>
                        {postFeedActive &&
                            <GridThreeCells
                                posts={posts}
                                postsGrid={true}
                                profile={true}
                                userId={authUser?._id}
                            />
                        }
                        {nftFeedActive &&
                            <GridThreeCells
                                posts={nfts}
                                postsGrid={false}
                                fetchMoreDataNft={fetchUserNFTs}
                                hasMoreNft={hasMoreNft}
                            />
                        }
                    </MiddleContainer>
                }
                {/*} this position may be wrong, insert it in a middle container or by context Natalia
                {messageVisible &&
                    <MessageAppComponent
                        showAppMessage={showAppMessage}
                        type={messageType}
                        textMessage={message}
                    />
                } */}
                {messageSingleVisible &&
                    <Message
                        setSingleMessageVisible={setSingleMessageVisible}
                    />
                }
            </Container>
        )
    }
))



export async function getServerSideProps(context) {
    const session = await getSession(context)

    // if (session === null)
    //     console.warn(`⚠️ ⚠️ ⚠️ ⚠️ /pages/profile.js :: getServerSideProps() -> session is null meaning no session exists ⚠️ ⚠️ ⚠️ ⚠️`);




    // const posts = LocalPosts.getInstance().posts_profile;

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
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



const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
 // margin-top: ${SPACING.large}px;

  @media screen and (max-width: 700px){
    margin-top: 0px;
}
`;