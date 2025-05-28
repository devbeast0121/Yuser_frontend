import React, { useEffect, useState, } from 'react';
import {
    PostsListContainer,
    Backdrop,
    ButtonWrapper,
} from './PostsList.elements';
import { useStore } from '../../stores/RootStore';
import { prunePosts } from '../../stores/tools.js';
import { FEED_TYPES } from '../NavFeed/NavFeed';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Loader from '../../pages/api/posts';
import LocalPosts from '../../stores/LocalPosts';
import { useSession } from 'next-auth/client';
import Modal from "react-overlays/Modal";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';
import { COLORS } from '../../styles/Styling';
import WrappedPost from './WrappedPost';
import Button from "../Button/Button";
/*
 DONT DELETE THIS COMMENT! IT HELPS ME KNOW WHAT PROPERTIES THESE OBJECTS HAVE
    a   p o s t 
{"_id":"60ecaf4e111cf0451c5b5b91",
"userId":"5b87f9134f7cd52938eec31b",
                                                                    "gems":1000,
"text":"No I think this is seven anyways part eight",
"lat":null,
"long":null,
"asset":"ikfWqTonZDTlXlEcP9voP",
"assetS3":null,
"type":"image/jpeg",
"height":1920,
"width":1440,
"orientation":null,
"thumbnail":null,
"placeName":null,
"createdAt":1626124110269,
"updatedAt":null,
"gifted":0,
"numGifters":1,
"comments":0,
"creatorComments":0,
"user":{"uname":"wolverine","avatar":"40CUyWfVA3JOPeEr8Wwng"},
"hasGifted":false}
    a   c o m m e n t 
{
    "createdAt":1626716659614,
    "full_slug":"2021.07.19.05:44:19:706i3",
                                                     "gifted":0,
    "totalgems":0,
    "parentCommentId":null,
    "text":"oiuou",
    "_id":"60f5b9f3ce4ea4002c1de04e",
    "parentPostId":"60f5a13c64d125002692ea86",
    "user":{"avatar":"40CUyWfVA3JOPeEr8Wwng","uname":"wolverine"},
    "userId":"5b87f9134f7cd52938eec31b",
    "slug":"706i3"}
*/

export default inject('store')(observer(
    function PostsList(props) {
        //  H O O K S 
        const rootstore = useStore();
        const [authUser, setAuthUser] = useState({});
        const [session, loading] = useSession();
        const [hasMoreHot, setHasMoreHot] = useState(true)
        const [hasMoreMe, setHasMoreMe] = useState(true)
        const [hasMoreProf, setHasMoreProf] = useState(true)
        const [showPleaseLoginModal, setShowPleaseLoginModal] = useState(false);
        const renderBackdrop = (props) => <Backdrop {...props} />;

        const [_, _pull] = useState(false);

        //The useEffect to set Avatar to the latest
        useEffect(() => {
            Loader.LoadHot();

            if (props.single) {
                props.store.setFeedType(FEED_TYPES.SINGLE);
            }

            else if (props.profile) {
                props.store.setFeedType(FEED_TYPES.PROFILE);
                LocalPosts.getInstance().setPosts_profile = props?.posts;
                return;
            }

            switch (props.store.feedType) {
                case FEED_TYPES.HOT:
                    LocalPosts.getInstance().setPosts_hot = props?.posts;
                    return;
                case FEED_TYPES.ME:
                    Loader.LoadMe(false)
                    return;
                default:
                    console.log(`case irrelevent`);
                    return;
            }
        }, []);

        useEffect(() => {
            (() => {
                if (props.store.feedposts.length !== 0)
                    return;
                if (props.store.feedType === FEED_TYPES.HOT)
                    //return setHasMoreHot(false)
                    if (props.store.feedType === FEED_TYPES.ME && props.store.feedposts.length === 0)
                        // return setHasMoreMe(false)
                        if (props.profile)
                            return setHasMoreProf(false)
            })();

            /*
                     _onEndReached()
                     Get the next batch of posts
                     William Doyle
                     July 25th 2021
                 */
            // async function _onEndReached() {
            //     if (!session)
            //         return setShowPleaseLoginModal(true);

            //     if (props.store.feedType === FEED_TYPES.HOT)
            //         await Loader.LoadHot(false, false);
            //     else if (props.store.feedType === FEED_TYPES.ME)
            //         await Loader.LoadMe(false);
            //     else if (props.store.feedType === FEED_TYPES.PROFILE) {
            //         if (props.profile) {
            //             // Changed by Vandana to fix a scroll error Sept 16 props?.posts[0]?.userId to props.userId
            //             // this might be a crappy thing to do, but I'm going to use the posts we have to get the user id. Then I'm going to use that user id to get the next batch of posts -wdd aug 17th 2021
            //             await Loader.LoadProfile(props.userId, false, false, {
            //                 current_length: LocalPosts.getInstance().posts_profile.length,
            //             });
            //         }
            //         else if (props?.targUser)
            //             await Loader.LoadProfile(props?.targUser?.id, false, false, {
            //                 current_length: LocalPosts.getInstance().posts_profile.length,
            //             });
            //         // else
            //         // console.warn(`STUB: PostsList.js _onEndReached() not sure how you managed this but it seems your trying to look at a profile feed but that feed doesn't belong to you and it also doesn't belong to anyone else. So you're trying to look at a feed outside the set of all feeds, that should be imposable, but alas, we are here`);
            //     }
            //     else
            //         throw new Error(`[PostsList.js::_onEndReached()] Unknown feedType ${props.store.feedType} feedType should be one of ${Object.values(FEED_TYPES).toString()} from FEED_TYPES`);
            // }

            let mayGetMore = true;
            // function onScroll() {
            //     if (mayGetMore && ((window.innerHeight + window.scrollY) > document.body.offsetHeight - 10)) {
            //         //console.log("fetching more.........")
            //         _onEndReached();
            //     }
            // }
            async function doEffect() {
                // if (props.forceUsePropsPosts !== true)
                //     window.addEventListener('scroll', onScroll);
                const tauthUser = await rootstore.getAuthUser();
                setAuthUser(tauthUser);
            }
            doEffect();
            return function cleanup() {
                mayGetMore = false;
                // window.removeEventListener('scroll', onScroll)
            }
        }, [props.store.feedType, props?.forceUsePropsPosts, props?.profile, props.store, props?.targUser, rootstore]);

        async function fetchMorePosts() {
            if (!session) {
                // SHOW "HEY DUMMY! LOG IN!"
                setShowPleaseLoginModal(true);
                // DO NOT LOAD MORE POSTS
                return;
            }

            if (props.store.feedType === FEED_TYPES.HOT) {
                let oldLength = props.store.localPosts.posts_hot.length
                //console.log(oldLength,"the old length")
                let authUser = null;
                try {
                    authUser = await props.store.getAuthUser();
                } catch (err) {
                    //do nothing
                }
                await Loader.LoadHot(false, authUser !== null);
                let newLength = props.store.localPosts.posts_hot.length
                //console.log(newLength,"newLength")
                if (oldLength === newLength) {
                    setHasMoreHot(false)
                }
            }
            else if (props.store.feedType === FEED_TYPES.ME) {
                const morePosts = await Loader.LoadMe(false);
                if (morePosts === false) {
                    setHasMoreMe(false)
                }
            }
            else if (props.store.feedType === FEED_TYPES.PROFILE) {
                if (props.profile) {
                    // Changed by Vandana to fix a scroll error Sept 16 props?.posts[0]?.userId to props.userId
                    // this might be a crappy thing to do, but I'm going to use the posts we have to get the user id. Then I'm going to use that user id to get the next batch of posts -wdd aug 17th 2021
                    const morePosts = await Loader.LoadProfile(props.userId, false, false, {
                        current_length: LocalPosts.getInstance().posts_profile.length,
                    });
                    if (morePosts === false) {
                        setHasMoreProf(false)
                    }
                }
                else if (props?.targUser)
                    await Loader.LoadProfile(props?.targUser?.id, false, false, {
                        current_length: LocalPosts.getInstance().posts_profile.length,
                    });
                // else
                // console.warn(`STUB: PostsList.js _onEndReached() not sure how you managed this but it seems your trying to look at a profile feed but that feed doesn't belong to you and it also doesn't belong to anyone else. So you're trying to look at a feed outside the set of all feeds, that should be imposable, but alas, we are here`);
            }
            else
                throw new Error(`[PostsList.js::_onEndReached()] Unknown feedType ${props.store.feedType} feedType should be one of ${Object.values(FEED_TYPES).toString()} from FEED_TYPES`);
        }

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
                /* you can also use 'auto' behaviour
                   in place of 'smooth' */
            });
        };


        return (
            <>
                <PostsListContainer>
                    <InfiniteScroll
                        dataLength={props.store.feedposts.length}
                        hasMore={props.store.feedType === FEED_TYPES.HOT ? hasMoreHot : props.store.feedType === FEED_TYPES.ME ? hasMoreMe : props.profile ? hasMoreProf : true}
                        loader={
                            <div style={{ alignSelf: "center" }}>
                                <ScaleLoader
                                    color={COLORS.purple}
                                    loading={true}
                                    size={150}
                                />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{ width: "100%", flexDirection: "column", overflowX: "hidden" }}
                        next={fetchMorePosts}
                        //scrollThreshold={0.5}
                        scrollThreshold={props.store.feedType === FEED_TYPES.HOT ? 0.8 : props.store.feedType === FEED_TYPES.ME ? 0.2 : props.profile ? 0.8 : 0.8}
                    >{prunePosts(toJS(props.store.feedposts)).map((post, index) =>
                        <WrappedPost
                            key={index} post={post} profile={props.profile} authUser={authUser}
                            showAppMessage={props.showAppMessage}
                        />
                    )}
                    </InfiniteScroll>
                    {
                        showPleaseLoginModal &&
                        <Modal
                            show={showPleaseLoginModal}
                            onClick={() => setShowPleaseLoginModal(false)}
                            renderBackdrop={renderBackdrop}
                        >
                            <SplashScreen />
                        </Modal>
                    }
                    <ButtonWrapper>
                        <Button
                            text={"Scroll to Top"}
                            onClick={scrollToTop}
                            isIcon={false}
                            width={"120px"}
                            color={"transparent"}
                            border={true}
                            borderColor={COLORS.purple}
                            padding={true}
                            colorText={({ theme }) => theme.textPrimary.color}
                        />
                    </ButtonWrapper>
                </PostsListContainer>
            </>
        )
    }
))