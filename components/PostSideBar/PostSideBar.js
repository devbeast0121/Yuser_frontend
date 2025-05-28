import React, { useEffect, useState, useRef } from 'react';
import {
    PostSideBarContainer,
    BtnSideBar,
    BtnText,
    MainContainer,
    AvatarContainer1
} from './PostSideBar.elements';

import Gem from '../../public/icons/gem.svg';
import GemWhite from '../../public/icons/gem-white.svg';
import Comments from '../../public/icons/comments.svg';
import Share from '../../public/icons/share.svg';
import SaveBox from '../../public/icons/save-box.svg';
import Buy from '../../public/icons/buy.svg';
import Icon from ".././Icon/Icon";
import OptionsMenu from '../../public/icons/menu.svg';
import MenuComponent from '../OptionsMenu/MenuComponent';
import { motion } from "framer-motion"
import { useStore } from '../../stores/RootStore';
import { BUTTON_TYPES } from '../PostModal/PostModal';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Numeral from 'react-numeral';
import { Delegate } from '../../stores/ClassTools';
import f_GetCurrentAmountGifted from '../../functions/f_GetCurrentAmountGifted';
import WouldPutOver from '../../functions/WouldPutOver';
import calculateCurrentAmountGifted from '../../functions/calculateCurrentGiftAmount';
import Avatar from '.././Avatar/Avatar';
import { ImageTypes, AvatarUrl, PlayableTypes } from '../../stores/tools.js';
import SocialShare from '../SocialShare/SocialShare';
import useOnClickOutside from '../../Hooks/useOnClickOutside';
import PostReportOverlay from '../PostReportOverlay/PostReportOverlay';
import { COLORS } from '../../styles/Styling.js';



const PostSideBar = (props) => {
    const rootstore = useStore();
    const [bounce, setBounce] = useState(0);
    const [size, setSize] = useState(1);
    const [authUser, _setAuthUser] = useState({});
    const [session, loading] = useSession();
    const [isStarred, setIsStarred] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
    const router = useRouter();
    const [shareButtonVisible, setShareButtonVisible] = useState(false);
    const [reportOption, setReportOption] = useState(null);
    const [showReportOverlay, setShowReportOverlay] = useState(false);
    const [position, setPosition] = useState(props.position);


    /**on click outside close the social shares menu */
    const socialShareRef = useRef(null);
    useOnClickOutside(socialShareRef, handleShareClickOutside);
    function handleShareClickOutside(toggle = false) {
        setShareButtonVisible(toggle);
    }


    useEffect(() => {
        async function doEffect() {
            _setAuthUser(await rootstore.getAuthUser())
        }
        doEffect();
    }, [rootstore]);

    useEffect(async () => {
        //should update this to query db for if post is starred. On error use if it is in the hot feed
        let postIsStarred = await rootstore.localPosts.postInHot(props.post._id);
        setIsStarred(postIsStarred);
    }, []);



    const [justGifted, setJustGifted] = useState(false);
    const [prevGemCount, setPrevGemCount] = useState(props.post.gems)

    /*
        Used to cause a rerender
        William Doyle
        April 22nd 2022
    */
    const [flipFlop, setFlipFlop] = useState(false)
    function flopFlip() {
        setFlipFlop(!flipFlop)
    }

    const GetCurrentAmountGifted = f_GetCurrentAmountGifted(rootstore);

    // set the authenticated user
    useEffect(() => (async () => _setAuthUser(await rootstore.getAuthUser()))(), [rootstore]);

    useEffect(() => {
        if (loading)
            return

        // make sure this post get loaded into state
        rootstore.updateLocalGiftingState(null, props.post._id, 0).then(flopFlip)
        return function cleanup() {
            setFlipFlop(false)
        }
    }, [loading])

    // indicate gifting failed via animation
    function Shake() {
        setBounce(-7)
        const timers = setTimeout(() => setBounce(0), 190)
        return () => clearTimeout(timers)
    }

    // indicate gifting success via animation
    function BounceUpDown() {
        setBounce(-40)
        setSize(1.4)
        const timers = setTimeout(() => {
            setBounce(0)
            setSize(1)
        }, 190)
        return () => clearTimeout(timers)
    }

    /*
        William Doyle
        March 30th 2022
        hasGifted
    */
    function hasGifted(post) {
        if (post.hasGifted)
            return Gem;

        if (rootstore.local_gifting_state_has(post._id)) {
            const amount = rootstore.local_gifting_state_get(post._id);
            if (amount > 0)
                return Gem;
        }
        return GemWhite;
    }

    /*
        CanGiftMinimum()
        Why make a function this simple?
        Foresight! We're going to need to account for the weird 24 hour rule at some point
        William Doyle
        July 30th 2021
    */
    function CanGiftMinimum(_post, skip = true) {
        // console.log(`stub: inside CanGiftMinimum typeof post is ${typeof _post }\ngifted is ${_post.gifted}`);

        if (!skip)
            setPrevGemCount(_post.gems);

        const currentAmountGifted = GetCurrentAmountGifted({
            type: 'post',
            id: _post._id,
        });
        const wouldPutOver = WouldPutOver(10, currentAmountGifted);
        return !wouldPutOver;
    }

    /*
        onGiftPosted()    
        July 20th 2021
        Setup for user to send gems
    */
    async function onGiftPressed() {
        if (!session) {
            router.push('/signin', null, { shallow: true })
            return
        }
        await rootstore.setSelectedPost(props.post);

        setJustGifted(false);
        if (CanGiftMinimum(props.post, false) === false) {
            Shake();
            return;
        }

        props.setGemAnimationDelegate(new Delegate(BounceUpDown));

        const authUser = await rootstore.getAuthUser();

        if (authUser?._id === props.post.userId) {
            Shake();
            return;
        }
        setJustGifted(true);
        props.onButtonClick(BUTTON_TYPES.GIFT, props.post);
    }

    /*
        shouldShake()
        Should the gemn icon shake or not
        William Doyle
        July 30th 2021
    */
    function shouldShake() {
        // DO NOT MODIFY STATE INSIDE THIS FUNCTION!!! YOU WILL CAUSE AN INFINITE LOOP OF RERENDERS
        if (justGifted)
            return false;

        if (props.post.userId === authUser?._id)
            return true;

        if (!CanGiftMinimum(props.post))
            return true;

        // if (prevGemCount < 1000)
        //     return false;

        function gemsGiftedInPastDayExceptMostRecently(_post) {

            // ------------------------------------------- code for 24 hour stuff

            // -------------------------------------------

            // temp return all gifts given to this post so far
            return _post.gems - prevGemCount;
        }

        if ((prevGemCount < 2000) && (gemsGiftedInPastDayExceptMostRecently(props.post) < 1000))
            return false;

        return true;

    }

    const shownGem = hasGifted(props.post)

    // send unauthenticated user to signin page... otherwise call props.onButtonClick
    function clickHandle(btnType, post) {
        if (!session) {
            router.push('/signin', null, { shallow: true })
            return
        }
        props.onButtonClick(btnType, post)
        setOptionsMenuVisible(false);
    }


    async function addRemoveStar(addRemove) {
        if (addRemove === "add") {
            let starred = await rootstore.starContent(props.post._id, "add")
            setIsStarred(starred);
            props.showAppMessage(true, "inform", "You added a star to the content.")
        }
        else if (addRemove === "remove") {
            let starred = await rootstore.starContent(props.post._id, "remove");
            setIsStarred(starred);
            props.showAppMessage(true, "inform", "You removed a star from the content.")
        }
        // setPostOptionsVisible(false);
    }

    const handleReportPost = (option) => {
        setReportOption(option);
        setShowReportOverlay(true);
    }

    async function onDeletePost() {
        await rootstore.deletePost(props.post._id);
        props.showAppMessage(true, "success", "You deleted the post.")
        //setPostOptionsVisible(false);
    }

    async function onHideContent(hide) {
        props.showAppMessage(true, "inform", "This content has been hidden.")
        let retVal = await rootstore.hideContent(props.post._id, "post", hide);
        if (retVal) {
            setIsHidden(hide);
        }
        // setPostOptionsVisible(false);
    }

    /*
        GiftAmountDisplay
    */
    function GiftAmountDisplay() {
        const post_id = props?.post?._id;

        const g = (() => {
            if (!rootstore.local_gifting_state_has(post_id))
                return props?.post?.gems;
            // return rootstore.local_gifting_state_get(post_id) + (props?.post?.gems ?? 0)- (props?.post?.gifted ?? 0); // amount gifted this session + amount gifted by all users - amount gifted in previous sessions (last step removes duplcates)
            return calculateCurrentAmountGifted(rootstore.local_gifting_state_get(post_id))(props?.post?.gems)(props?.post?.gifted)
        })();

        if (g === undefined || !(g > 0))
            return (<BtnText>{'Gift'}</BtnText>);

        if (g > 999)
            return (
                <BtnText>
                    <Numeral
                        className="BoldFontExtraSmall"
                        value={g}
                        format={"0.0a"}
                        style={{ fontSize: 12, }}
                    />
                </BtnText>
            );
        return (<BtnText>{g}</BtnText>);
    }

    const optionsClick=()=>{
        if (!session) {
            router.push('/signin', null, { shallow: true })
            return
        }
        else{
            setOptionsMenuVisible(true)
        }
    }
    const txtBuyButton = (authUser?._id) === props.post.userId ? "LIST" : "BUY"
    return (
        <>
            <MainContainer position={props.position} modal={props.modal}>
                {!props.show ?
                    <PostSideBarContainer position={props.position}>
                        {props.position !== "horizontal" &&
                            <BtnSideBar
                                position={props.position}
                            >
                                <AvatarContainer1>
                                    <Avatar
                                        src={AvatarUrl(props.post?.user?.avatar, "m")}
                                        size={'medium'}
                                        alt={'Avatar'}
                                        frame={true}
                                        edit={false}
                                        userName={props.post?.user?.uname}
                                        userId={props.post?.userId}
                                    />
                                </AvatarContainer1>
                            </BtnSideBar>
                        }
                        <BtnSideBar
                            position={props.position}
                            onClick={onGiftPressed}
                        >
                            <motion.div
                                //initial={shouldShake() ? { x: 0 } : { y: 0, scale: size, }}
                                //animate={shouldShake() ? { x: bounce } : { y: bounce, scale: size, }}
                               initial={bounce === -7 ? { x: 0 } : { y: 0, scale: size, }}
                               animate={bounce === -7  ? { x: bounce } : { y: bounce, scale: size, }}
                                transition={{
                                    ease: [0.17, 0.67, 0.83, 0.67],
                                    type: "spring",
                                    damping: bounce === -7  ? 13 : 26,
                                    mass: 2,
                                    stiffness: bounce === -7  ? 4000 : 1100,
                                }}
                            >
                                <Icon width="auto" height="35px" name={shownGem} />
                            </motion.div>
                            <GiftAmountDisplay />
                        </BtnSideBar>
                        <BtnSideBar
                            position={props.position}
                            onClick={() => props.onButtonClick(BUTTON_TYPES.COMMENTS, props.post)}
                        >
                            <Icon width="auto" height="35px" name={Comments} />
                            {props?.post?.comments > 0 ?
                                <BtnText>
                                    {props?.post?.comments > 999 ?
                                        <Numeral
                                            className="BoldFontExtraSmall"
                                            value={props.post.comments}
                                            format={"0.0a"}
                                            style={{ fontSize: 12, }}
                                        />
                                        : props.post.comments}
                                </BtnText>
                                : <BtnText>{'Reply'}</BtnText>}
                        </BtnSideBar>
                        <BtnSideBar position={props.position}
                            onClick={() => setShareButtonVisible(true)}
                        >
                            <Icon width="auto" height="35px" name={Share} />
                            <BtnText>{'SHARE'}</BtnText>
                        </BtnSideBar>

                        {props.position == "vertical" ?
                            <>
                                {shareButtonVisible &&
                                    <div ref={socialShareRef}>
                                        <SocialShare
                                            post={props.post}
                                            setShareButtonVisible={setShareButtonVisible}
                                            position={props.position}
                                        />
                                    </div>
                                }
                            </>
                            :
                            <motion.div
                                key="shareHorizontal"
                                initial={
                                    shareButtonVisible
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -500 }
                                }
                                exit={
                                    shareButtonVisible
                                        ? { opacity: 0, x: 0 }
                                        : { opacity: 1, x: 0 }
                                }
                                animate={
                                    shareButtonVisible
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -500 }
                                }
                                transition={{
                                    type: "spring",
                                    ease: [0.17, 0.67, 0.83, 0.67],
                                    damping: 35,
                                    mass: 1,
                                    stiffness: 300,
                                }}
                                style={{
                                    overflow: shareButtonVisible
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: -500 },
                                    position: 'absolute',
                                    left: 24,
                                    zIndex: shareButtonVisible? 999 : 1,
                                }}
                            >
                                <div ref={socialShareRef}>
                                    <SocialShare
                                        post={props.post}
                                        setShareButtonVisible={setShareButtonVisible}
                                        position={props.position}
                                    />
                                </div>
                            </motion.div>
                        }
                        {
                           ( props.post.userId !== authUser?._id  || authUser.isMod) &&
                            <BtnSideBar position={props.position}
                            onClick={() => optionsClick()}
                        >
                            <Icon width="auto" height="25px" name={OptionsMenu}  strokeColor={COLORS.white} strokeWidth="2"/>
                        </BtnSideBar>
                        }
                       

                        {/* the "click outside" function can't be used because because openening the options
                        list after displaying the title (header: "report Post") handles as a click
                        outside and doesn't give to open the options list, therefore need to use the BackdropOverlay .
                        Natalia **/}
                        {optionsMenuVisible &&
                            <MenuComponent
                                setOptionsMenuVisible={setOptionsMenuVisible}
                                optionsMenuVisible={optionsMenuVisible}
                                profilePage={false}
                                user={authUser}
                                isStarred={isStarred}
                                isHidden={isHidden}
                                onAddRemoveStar={addRemoveStar}
                                onDeletePost={onDeletePost}
                                onHideContent={onHideContent}
                                handleReportPost={handleReportPost}
                                position={position}
                            />
                        }
                        {false &&   // props.post.postNFT &&
                            <BtnSideBar
                                position={props.position}
                                onClick={() => clickHandle(BUTTON_TYPES.BUY, props.post)}
                            >
                                <Icon width="auto" height="35px" name={Buy} />
                                <BtnText>{txtBuyButton}</BtnText>
                            </BtnSideBar>
                        }
                        {false && props.position == "horizontal" && // props.post.postNFT &&
                            <BtnSideBar position={props.position}                          >
                                <Icon width="auto" height="35px" name={SaveBox} />
                                <BtnText>{'SAVE'}</BtnText>
                            </BtnSideBar>
                        }
                    </PostSideBarContainer>
                    : null}
                {
                    showReportOverlay && reportOption !== null &&
                    <PostReportOverlay
                        reportOption={reportOption}
                        setShowReportOverlay={setShowReportOverlay}
                        show={showReportOverlay}
                        setReportOption={setReportOption}
                        post={props.post}
                        showAppMessage={props.showAppMessage}
                    />
                }

            </MainContainer>

        </>
    )
}

export default PostSideBar