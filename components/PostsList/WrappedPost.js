import React, { useState, useRef, useEffect } from 'react';
import {
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
    MediaWrapperVideo,
    ButtonContainer,
    ContentHeader,
    ContentHeaderInner,
    ContentHeaderInnerVideo
} from './PostsList.elements';
import PostSideBar from '.././PostSideBar/PostSideBar';
import PostModal, { BUTTON_TYPES } from '../PostModal/PostModal';
import GiftBar from '../GiftBar/GiftBar';
import { motion } from "framer-motion"
import { useStore } from '../../stores/RootStore';
import { ImageTypes, PlayableTypes } from '../../stores/tools.js';
import PostMedia from '../PostMedia/PostMedia';
import ButtonFollow from '../ButtonFollow/ButtonFollow';
import AutolinkerComponent from '../AutolinkerComponent/AutolinkerComponent';
import { Delegate } from '../../stores/ClassTools';
import { f_handleViewComments } from './Common';
import useOnClickOutside from '../../Hooks/useOnClickOutside';
import HashtagChallenge from "../HashtagChallenge/HashtagChallenge"
import { runInAction } from "mobx";

const variantVerical = {
    visible: { opacity: 1, y: 0, },
    hidden: { opacity: 0, y: 200 },
}

const __handleClick = (
    rootstore,
    OpenSideBarModal,
    setOverlayVisible,
    setPostId,
    setShowGiftBar,
    setShowGiftAmounts,
    setChoosenPost,
    setButtonType,
    handleViewComments,
) =>
    post =>
        btnType => {
            setButtonType(btnType);
            switch (btnType) {
                case BUTTON_TYPES.COMMENTS:
                    rootstore.setSelectedPost(post);
                    handleViewComments(post);
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
                    if (post?._id) {
                        setPostId(post._id);
                        setShowGiftBar(true);
                        setShowGiftAmounts(true);
                    }
                    setChoosenPost(post);
                    break;
                default:
                    console.warn(`btnType is "${btnType}". What is "${btnType}"?`);
                    break;
            }
        }

/*
    Only To be used in the PostsList component
    Seperated Into Own Component During William Doyle's (that's me) local gifting state refactor on April 1st 2022
*/
const initialState = {
    show: false,
    showGiftBar: false,
    gemAnimationDelegate: new Delegate(() => { }),
    postId: '',
    showGiftAmounts: false,
    choosenPost: '',
    btnType: BUTTON_TYPES.INVALID,
    overlayVisable: false,
    comments: [],
    dimensions: {
        height: 0,
        width: 0
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'show':
            // console.log(`stub: about to set show to ${action.show}`);
            return {
                ...state,
                show: action.show,
            };
        case 'showGiftBar':
            return {
                ...state,
                showGiftBar: action.showGiftBar,
            };
        case 'gemAnimationDelegate':
            return (() => {
                const candidate = action.gemAnimationDelegate;
                if (!candidate instanceof Delegate)
                    throw Error(`expected gemAnimationDelegate to be a Delegate`);
                return {
                    ...state,
                    gemAnimationDelegate: candidate,
                };
            })();
        case 'open side bar modal':
            return (() => {
                // console.log(`stub: open side bar modal`);
                const candidate_targPost = action.targPost;
                const candidate_postPressing = action.postPressing;

                // validate types and throw errot if not expected
                if (!(ImageTypes.includes(candidate_targPost.type) || (PlayableTypes.includes(candidate_targPost.type) && !candidate_postPressing)))
                    throw new Error(`expected targPost.type to be one of ${ImageTypes} or ${PlayableTypes}`);

                return {
                    ...state,
                    show: true,
                    choosenPost: candidate_targPost,
                }
            })();
        case 'set post id':
            return {
                ...state,
                postId: action.postId,
            };
        case 'set show gift amounts':
            return {
                ...state,
                showGiftAmounts: action.showGiftAmounts,
            };
        case 'set choosen post':
            return {
                ...state,
                choosenPost: action.choosenPost,
            };
        case 'set btn type':
            return {
                ...state,
                btnType: action.btnType,
            };
        case 'set overlay visable':
            return {
                ...state,
                overlayVisable: action.overlayVisable,
            };
        case 'set comments':
            return {
                ...state,
                comments: action.comments,
            };
        case 'set dimensions':
            return {
                ...state,
                dimensions: {
                    height: action.height,
                    width: action.width
                }
            }
        default:
            return state;
    }
}

export default function WrappedPost({ post, profile, authUser, showAppMessage }) {
    const rootstore = useStore();
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const postContainerRef = useRef(null);
    let observer = useRef(null);
    let viewedAt = useRef(null);

    const setPostId = postId => dispatch({ type: 'set post id', postId });
    const OpenModal = () => { return dispatch({ type: 'open side bar modal', targPost: post, postPressing: false }) }


    const toggle_gifting_options = new_state => {
        dispatch({ type: 'set show gift amounts', showGiftAmounts: new_state });
        dispatch({ type: 'showGiftBar', showGiftBar: new_state });
    }
    const hide_gifting_options = toggle_gifting_options.bind(null, false);
    const show_gifting_options = toggle_gifting_options.bind(null, true);

    const _handleClick = __handleClick(
        rootstore,
        OpenModal,
        isVisable => dispatch({ type: 'set overlay visable', overlayVisable: isVisable }),
        setPostId,
        showGiftBar => toggle_gifting_options(showGiftBar),
        showGiftAmounts => dispatch({ type: 'set show gift amounts', showGiftAmounts }),
        choosenPost => dispatch({ type: 'set choosen post', choosenPost }),
        btnType => dispatch({ type: 'set btn type', btnType }),
        f_handleViewComments(
            comments => dispatch({ type: 'set comments', comments }),
            setPostId,
        )
    );

    const handleClick = (btnType, post) => _handleClick(post)(btnType);

    // run code when someone clicks outside of the gift bar
    const giftBarRef = React.useRef(null);
    useOnClickOutside(giftBarRef, hide_gifting_options);

    const onPostClick = () => {
        OpenModal(post, true);
        runInAction(() => {
            rootstore.postModalVisible = true;
        })

    }

    /*function calculateDimensions() {
        if (post._id === "banner") {
            return;
        }
        let postHeight = post.height;
        let postWidth = post.width;
        if (post?.type?.includes("video") || post?.type?.includes("audio")) {
            if (post.orientation === "portrait") {
                postHeight = Math.max(post.width, post.height);
                postWidth = Math.min(post.width, post.height);
            }
            else {
                postWidth = Math.max(post.height, post.width);
                postHeight = Math.min(post.height, post.width);
            }
        }
        let height = 0;
        let width = 0;
        let neededWidth = 93 + (post.type.includes("video") ? 0 : 50)  //this width is booked for sidebar(70) + sidebar paddingleft(23) and margin-left is 50px for posts where height > width
        if (window) {
            let maxHeight = Math.max(window?.innerHeight, postContainerRef?.current?.clientHeight)
            let tempHeight = Math.min(maxHeight, postHeight);
            let tempWidth = Math.min(postContainerRef?.current?.clientWidth - neededWidth, postWidth);
            let hMulti = tempHeight / postHeight;
            let wMulti = tempWidth / postWidth;
            let multi = Math.min(hMulti, wMulti);
            height = postHeight * multi;
            width = postWidth * multi
        } else {
            console.log("no window dims");
        }
        dispatch({ type: "set dimensions", height: height, width: width })
        return { height, width };
    }; 

    useEffect(() => {
        calculateDimensions();
    }, [post])

    useEffect(() => {
        if (window) {
            window.addEventListener('resize', calculateDimensions);
        }
        return () => window.removeEventListener('resize', calculateDimensions);
    }, []);
*/
    useEffect(()=>{
        const intersectionObserverOptions = {
            threshold:0.8
        }
        if(postContainerRef && !observer.current && post._id !== "banner"){
            observer.current = new IntersectionObserver(observerCallback,intersectionObserverOptions);
            try{
                observer.current.observe(postContainerRef.current);
            }catch(err){
                //do Nothing;
                console.log(post._id);
            }
        }
        return ()=>{
            try{
                observer.current.disconnect();
            }catch(err){
                console.error(err);
            }
        }
    },[postContainerRef])

    function observerCallback(data){
        let entity = data[0];
        if(entity.isIntersecting && viewedAt.current === null){
            viewedAt.current = new Date().getTime();
            rootstore.createViewRelationship({type:"fullscreen",postId:post._id});
        }
        else if(!entity.isIntersecting){
            if(viewedAt.current){
                let duration = (new Date().getTime() - viewedAt.current)/1000.0
                if(duration > 0.25){
                    rootstore.createViewRelationship({type:"fullscreen",postId:post._id,duration});
                }
                viewedAt.current = null;
            }
        }
    }

    const unamePress=(userName)=>{
        window.open('/' + userName,'_ blank')
    }

    return (

        <PostContainer key={post?._id} post={post}>
            {post._id === "banner" ?
                <HashtagChallenge /> :
                <PostBox>
                    <PostInfoSection>
                        <ContentInformationSection ref={postContainerRef}>
                            <PostMediaContainer  >
                                {post?.type?.includes('video') || post?.type?.includes('audio') ?
                                    <MediaWrapperVideo onClick={onPostClick}
                                        orientation={post?.orientation} width={post.width} height={post.height}
                                    //dimensions={state.dimensions}>
                                    >
                                        <PostMedia
                                            singleMode={false}
                                            post={post}
                                        />
                                        <div style={{ position: 'absolute', left: 20, right: 20, top: 20, bottom: 100 }} onClick={() => OpenModal(post, true)}></div>
                                    </MediaWrapperVideo>
                                    :
                                    <MediaWrapper onClick={() => OpenModal(post, true)}
                                        type={post?.type} width={post.width} height={post.height}
                                    //dimensions={state.dimensions}
                                    >
                                        <PostMedia
                                            singleMode={false}
                                            post={post}
                                            height={state.dimensions?.height}
                                            width={state.dimensions.width}
                                        />
                                    </MediaWrapper>
                                }
                                {
                                    !state.show ?
                                        <PostSideBarContainer>
                                            <motion.div
                                                key='postSideBar'
                                                style={{ zIndex: state.showGiftBar ? 1 : 99, position: "relative" }}
                                            >
                                                <PostSideBar
                                                    setGemAnimationDelegate={newValue => dispatch({ type: 'gemAnimationDelegate', gemAnimationDelegate: newValue })}
                                                    post={post}
                                                    onButtonClick={handleClick}
                                                    position={'vertical'}
                                                    showAppMessage={showAppMessage}
                                                />
                                            </motion.div>

                                            {
                                                post?._id == state.postId &&
                                                <motion.div
                                                    key='giftBar'
                                                    onClick={() => handleClick('gift_amount', post)}
                                                    variants={variantVerical}
                                                    initial={state.showGiftBar ? { opacity: 1, y: 0 } : { opacity: 0, y: 200, }}
                                                    exit={state.showGiftBar ? { opacity: 0, y: 0, } : { opacity: 1, y: 0 }}
                                                    animate={state.showGiftBar ? 'visible' : 'hidden'}
                                                    transition={{
                                                        type: "spring",
                                                        ease: [0.17, 0.67, 0.83, 0.67],
                                                        damping: 30,
                                                        mass: 1,
                                                        stiffness: 400,
                                                    }}
                                                    style={{
                                                        zIndex: state.showGiftBar ? 99 : 1,
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: 0,
                                                    }}
                                                >
                                                    <WrapOverflow >
                                                        {
                                                            state.showGiftAmounts &&
                                                            <div
                                                                ref={giftBarRef}
                                                            >
                                                                <GiftBar
                                                                    itemInfo={{
                                                                        type: 'post',
                                                                        id: post?._id,
                                                                        owner_id: post?.userId,
                                                                        auth_user_id: authUser?._id,
                                                                    }}
                                                                    callback={() => {               // things to do after the user has gifted
                                                                        // 1. hide the gift bar
                                                                        hide_gifting_options();
                                                                        // 2. animate the gem icon
                                                                        state.gemAnimationDelegate.run();
                                                                    }}
                                                                    position={'vertical'}
                                                                />
                                                            </div>
                                                        }
                                                    </WrapOverflow>
                                                </motion.div>
                                            }
                                        </PostSideBarContainer>
                                        : null
                                }
                            </PostMediaContainer>
                            <ContentHeader>
                                {post?.type?.includes('video') || post?.type?.includes('audio') ?
                                    <ContentHeaderInnerVideo type={post?.type} orientation={post?.orientation} width={post.width} height={post.height}>
                                        <AuthorName onClick={()=>unamePress(post?.user?.uname)} style={{cursor:"pointer"}}>{post?.user?.uname}</AuthorName>
                                        {post.text ?
                                            <ContentDescription>
                                                <AutolinkerComponent text={post.text} />
                                            </ContentDescription>
                                            : null}
                                    </ContentHeaderInnerVideo>
                                    :
                                    <ContentHeaderInner type={post?.type} orientation={post?.orientation} width={post.width} height={post.height}>
                                        <AuthorName onClick={()=>unamePress(post?.user?.uname)} style={{cursor:"pointer"}}>{post?.user?.uname}</AuthorName>
                                        {post.text ?
                                            <ContentDescription>
                                                <AutolinkerComponent text={post.text} />
                                            </ContentDescription>
                                            : null}
                                    </ContentHeaderInner>
                                }
                                {(post?.userId === rootstore.authUser._id) || (profile) ?
                                    null :
                                    <ButtonContainer>
                                        <ButtonFollow
                                            userId={post?.userId}
                                            border={false}
                                            colored={true}
                                            size={'small'}
                                        />
                                    </ButtonContainer>
                                }
                            </ContentHeader>
                        </ContentInformationSection>
                    </PostInfoSection>
                </PostBox>
            }
            {
                state.show &&
                <PostModal
                    show={state.show}
                    setShow={value => dispatch({ type: 'show', show: value })}
                    targetPostId={state.choosenPost?._id}
                    comments={state.comments}
                    postComments={state.choosenPost.comments}
                    btnType={state.btnType}
                    owner={'WrappedPost'}
                />
            }
        </PostContainer>

    );
}