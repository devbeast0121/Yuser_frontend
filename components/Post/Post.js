import React, { useCallback, useState } from "react";

import PostSideBar from '.././PostSideBar/PostSideBar';
import { vout } from '../../stores/tools';
import ButtonFollow from '../ButtonFollow/ButtonFollow';
import PostModal, { BUTTON_TYPES } from '../PostModal/PostModal';
import GiftBar from '../GiftBar/GiftBar';
import { motion } from "framer-motion"
import { useStore } from '../../stores/RootStore';
import { FEED_TYPES } from '../NavFeed/NavFeed';
import { inject, observer } from 'mobx-react';
import PostMedia from '../PostMedia/PostMedia';
import { autorun, toJS } from 'mobx';
import LocalPosts from "../../stores/LocalPosts";
import { useSession } from 'next-auth/client';
import Avatar from '.././Avatar/Avatar';
import { ImageTypes, AvatarUrl, PlayableTypes, prunePosts } from '../../stores/tools.js';
import {
    PostsListContainer,
    PostContainer,
    PostBox,
    PostInfoSection,
    ContentInformationSection,
    AuthorName,
    ContentDescription,
    PostSideBarContainer,
    WrapOverflow,
    PostMediaContainer,
    MediaWrapper,
    BackdropOverlay,
    Backdrop,
    AvatarContainer1,
    AvatarContainer2,
    ButtonContainer,
    ContentHeader,
    ContentHeaderInner,
} from "../PostsList/PostsList.elements";
import AutolinkerComponent from '../AutolinkerComponent/AutolinkerComponent';
import Loader from "../../pages/api/posts";


export default inject('store')(observer(
    function Post(props) {
        //  H O O K S 
        const rootstore = useStore();
        const [show, setShow] = useState(false); //PostModal
        const [btnType, setType] = useState(BUTTON_TYPES.INVALID);
        const [choosenPost, setChoosenPost] = useState('');
        const [showGiftBar, setShowGiftBar] = useState(false);
        const [postId, setPostId] = useState('');
        const [comments, setComments] = useState([]);
        const [afterGiftCallback, setAfterGiftCallback] = useState(() => () => { }); // hahahahaha -- not sure if this extreamly elegent or extreamly convoluted -wdd
        const [showGiftAmounts, setShowGiftAmounts] = useState(false);
        const [authUser, setAuthUser] = useState({});
        const [overlayVisible, setOverlayVisible] = useState(false); //BackdropOverlay
        //   const [posts, setPosts] = useState([]);
        const [session, loading] = useSession();

        //   C O N S T A N T S
        const variantVerical = {
            visible: { opacity: 1, y: 0, },
            hidden: { opacity: 0, y: 200 },
        }

        // function OpenSideBarModal(targPost) {
        //     setShow(true);
        //     setChoosenPost(targPost);
        // }
        function OpenSideBarModal(targPost, postPressing) {
            if (ImageTypes.includes(targPost.type)) {
                setShow(true);
                setChoosenPost(targPost);
                return;
            }

            if (PlayableTypes.includes(targPost.type) && !postPressing) {
                setShow(true);
                setChoosenPost(targPost);
            }
        }

        /*
            sendGems()
            William Doyle
            ~July 19th 2021
        */
        async function sendGems(count, pid, recipientID,) {
            if (authUser?._id === recipientID)
                return; //  U S E R S    M A Y    N O T    G I F T    S E L F 
            await rootstore.giftStonesAndUpdateLocal(recipientID, pid, count);
            afterGiftCallback();
            setShowGiftAmounts(false); // fully hide gift bar... without this, other side bar buttons don't work because an invisable gift bar absorbs clicks
        }

        /*
            handleViewComments()
            Load comments on the provided post and set them to be viewable
            William Doyle
            July 19th 2021
        */
            async function handleViewComments(post) {
                await Loader.LoadComments(post._id);
                setComments(LocalPosts.getInstance().comments);
    
                setPostId(post._id); // will be needed if the user wants to add a comment
            }
    
            /*
                handleClick()
            */
            const handleClick = (btnType, post) => {
                // console.log(`%cinside handleClick of PostList.js btnType ${btnType}`, "color: blue");
    
                setType(btnType);
                switch (btnType) {
                    case BUTTON_TYPES.COMMENTS:
                        rootstore.setSelectedPost(post);
                        handleViewComments(post); // eventually we might be able to pull this function
                        OpenSideBarModal(post, false);
                        return;
                    case BUTTON_TYPES.SHARE:
                        // open up post side bar modal
                        rootstore.setSelectedPost(post);
                        OpenSideBarModal(post, false);
                        break;
                    case BUTTON_TYPES.BUY:
                        // open up post side bar modal
                        rootstore.setSelectedPost(post);
                        OpenSideBarModal(post, false);
                        break;
                    case 'gift_amount':
                        return;
                    case BUTTON_TYPES.GIFT:
                        rootstore.setSelectedPost(post);
                        setOverlayVisible(true)
                        {
                            if (post?._id) {
                                // console.log(`stub about to set post id`);
                                setPostId(post._id);
                                setShowGiftBar(true);
                                // console.log(`STUB:: gifted is ${post.gifted}`);
                                setShowGiftAmounts(true);
                            }
                            setChoosenPost(post);
                        }
                        break;
                    default:
                        console.warn(`btnType is "${btnType}". What is "${btnType}"?`);
                        break;
                }
            }

        const closeOverlay = () => {
            setOverlayVisible(false)
            if (showGiftBar)
                setShowGiftBar(false)
        }

        vout(() =>
            console.log(props.post, "postId")
        );

        return (
            <>
                <PostsListContainer>
                <PostContainer key={props.post?._id} post={props.post}>
                                <PostBox>
                                    <PostInfoSection>
                                        <AvatarContainer1>
                                            <Avatar
                                                src={AvatarUrl(props.post?.user?.avatar, "m")}
                                                size={'medium'}
                                                alt={'Avatar'}
                                                frame={true}
                                                edit={false}
                                                userName={props.post?.user?.uname}
                                            />
                                        </AvatarContainer1>
                                        <ContentInformationSection>
                                            <ContentHeader>
                                                <AvatarContainer2>
                                                    <Avatar
                                                        src={AvatarUrl(props.post?.user?.avatar, "s")}
                                                        size={'small'}
                                                        alt={'Avatar'}
                                                        frame={true}
                                                        edit={false}
                                                        userName={props.post?.user?.uname}
                                                    />
                                                </AvatarContainer2>
                                                <ContentHeaderInner>
                                                    <AuthorName>{props.post?.user?.uname}</AuthorName>
                                                    <ContentDescription>
                                                        <AutolinkerComponent text={props.post.text} />
                                                    </ContentDescription>
                                                </ContentHeaderInner>
                                            </ContentHeader>
                                            <PostMediaContainer>
                                                <MediaWrapper onClick={() => OpenSideBarModal(props.post, true)}>
                                                    <PostMedia
                                                        singleMode={false}
                                                        post={props.post}
                                                        size={'m'}
                                                    />
                                                </MediaWrapper>
                                                {
                                                    !show ?
                                                        <PostSideBarContainer>
                                                            <motion.div
                                                                key='postSideBar'
                                                                style={{ zIndex: showGiftBar ? 1 : 99, position: "relative" }}
                                                            >
                                                                <PostSideBar
                                                                    setAfterGiftCallback={setAfterGiftCallback}
                                                                    post={props.post}
                                                                    onButtonClick={handleClick}
                                                                    position={'vertical'}
                                                                />
                                                            </motion.div>

                                                            {
                                                                props.post?._id == postId &&
                                                                <motion.div
                                                                    key='giftBar'
                                                                    onClick={() => handleClick('gift_amount', props.post)}
                                                                    variants={variantVerical}
                                                                    initial={showGiftBar ? { opacity: 1, y: 0 } : { opacity: 0, y: 200, }}
                                                                    exit={showGiftBar ? { opacity: 0, y: 0, } : { opacity: 1, y: 0 }}
                                                                    animate={showGiftBar ? 'visible' : 'hidden'}
                                                                    transition={{
                                                                        type: "spring",
                                                                        ease: [0.17, 0.67, 0.83, 0.67],
                                                                        damping: 30,
                                                                        mass: 1,
                                                                        stiffness: 400,
                                                                    }}
                                                                    style={{
                                                                        zIndex: showGiftBar ? 99 : 1,
                                                                        position: 'absolute',
                                                                        bottom: 0,
                                                                        right: 0,
                                                                    }}
                                                                >
                                                                    <WrapOverflow >
                                                                        {
                                                                            showGiftAmounts &&
                                                                            <GiftBar
                                                                                itemInfo={{ type: 'post', id: props.post?._id }}
                                                                                // sendGems={amount => sendGems(amount, props.post?._id, props.post?.userId)}
                                                                                closeGiftBar={() => setShowGiftBar(false), closeOverlay}
                                                                                position={'vertical'}
                                                                            />
                                                                        }
                                                                    </WrapOverflow>
                                                                </motion.div>
                                                            }
                                                        </PostSideBarContainer>
                                                        : null
                                                }
                                            </PostMediaContainer>
                                        </ContentInformationSection>
                                        {
                                            (props.post?.userId === rootstore.authUser._id) || (props.profile) ?
                                                null :
                                                <ButtonContainer>
                                                    <ButtonFollow
                                                        userId={props.post?.userId}
                                                        border={false}
                                                        colored={true}
                                                        size={'small'}
                                                    />
                                                </ButtonContainer>
                                        }
                                    </PostInfoSection>
                                </PostBox>
                            </PostContainer>
                                            {
                        show &&
                        <PostModal
                            show={show}
                            setShow={setShow}
                            targetPostId={choosenPost?._id}
                            comments={comments}
                            // btnType={Object.values(BUTTON_TYPES).includes(btnType) ? btnType : BUTTON_TYPES.INVALID}
                            btnType={btnType}
                            position={props.position}
                        />
                    }
                    {overlayVisible && session ?
                        < BackdropOverlay onClick={closeOverlay} />
                        : null
                    }
                </PostsListContainer>
            </>
        )
    }
))