import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    CommentsListContainer,
    CommentContainer,
    CommentBox,
    UserName,
    UserComment,
    TxtReply,
    LoadMore,
    ReplyButton
} from './CommentsList.elements';
import Gem from '../../public/icons/gem.svg';
import commentOutline from '../../public/icons/commentOutline.svg';
import GemWhite from '../../public/icons/gem-white.svg';
import Avatar from '.././Avatar/Avatar';
import Icon from ".././Icon/Icon";
import { clone_nf, AvatarUrl } from '../../stores/tools';
import { inject, observer } from 'mobx-react';
import GiftBarComments from '../GiftBarComments/GiftBarComments';
import AutolinkerComponent from '../AutolinkerComponent/AutolinkerComponent';
import { motion } from 'framer-motion';
import Numeral from 'react-numeral';
import { useStore } from '../../stores/RootStore';


export default inject('store')(observer(

    function CommentsList(props) {
        const [showGiftAmounts, setShowGiftAmounts] = useState(false);
        const [selectedComment, setSelectedComment] = useState(0);
        const [commentsWithReplies, setCommentsWithReplies] = useState({});
        const [authUser, setAuthUser] = useState(undefined);
        const effectCount = useRef(0);
        const rootstore = useStore();


        /*
            LoadReplies()
            Put replies of passed comment into object called commentsWithReplies with index of that comments id
            William Doyle
            July 28th 2021
        */
        function LoadReplies(comment) {
            // console.log(`STUB: [commentsList.js] comment is ${JSON.stringify(comment)}`);
            const clone = clone_nf(commentsWithReplies);
            clone[comment._id] = clone_nf(comment.replies);
            setCommentsWithReplies(clone);
        }

        /*
            updateReplies()
            update the replies lists in `commentsWithReplies`
            William Doyle
            July 28th 2021
        */
        // useCallback(function updateReplies() {
        // const updateReplies = useCallback(() => {
        //     const comKeys = Object.keys(commentsWithReplies);
        //     const clone = clone_nf(commentsWithReplies);
        //     comKeys.forEach(comKey => clone[comKey] = clone_nf(props.comments.find(c => c._id == comKey).replies));
        //     setCommentsWithReplies(clone);
        // }, [commentsWithReplies, props.comments]);

        // useCallback(function _updateReplies() {
        //     updateReplies();
        // }, [updateReplies]);

        useEffect(() => {

            /*
                updateReplies()
                update the replies lists in `commentsWithReplies`
                William Doyle
                July 28th 2021
            */
            function updateReplies() {
                const comKeys = Object.keys(commentsWithReplies);
                const clone = clone_nf(commentsWithReplies);
                comKeys.forEach(comKey => clone[comKey] = clone_nf(props.comments.find(c => c._id == comKey).replies));
                setCommentsWithReplies(clone);
            }



            async function doEffect() {
                updateReplies();
                if (effectCount.current === 0)
                    setAuthUser(await props.store.getAuthUser());
                effectCount.current++;
            }
            doEffect();
        }, [props.comments, props.store,]);


        async function handleCommentReplies(comment) {
            props.setParentCommentId(comment._id)
            props.setIsReply(true)
            props.setReplyData({
                type: 'setReply',
                payload: {
                    replyTarget: { ...comment.user, _id: comment.userId, commId: comment._id }
                }
            })
        }

        ////////////////////////////////////////////
        //  STUFF FOR GIFTING COMMENTS//////////////
        ////////////////////////////////////////////






        return (
            <>
                {props.comments.length > 0 ?
                    <CommentsListContainer>
                        {props.comments.map((comment, index) => (
                            <>
                                <CommentContainer key={index} comment={comment} selectedComment={selectedComment}>
                                    <Avatar
                                        src={AvatarUrl(comment.user.avatar, "s")}
                                        size={'small'}
                                        alt={'Author Avatar'}
                                        frame={false}
                                        edit={false}
                                        userName={comment.user.uname} 
                                        userId={comment.user._id}
                                        />
                                    <CommentBox>
                                        <UserName>{comment.user.uname}</UserName>
                                        <UserComment>
                                            <AutolinkerComponent text={comment.text} />
                                        </UserComment>
                                        <ReplyButton
                                            onClick={() => handleCommentReplies(comment)}
                                        >
                                            { // the "reply" text here should not be selectable with my mouse... only clickable
                                            }
                                            <Icon
                                                className="center"
                                                strokeColor={"red"}//{({ theme }) => theme.textSecondary.color}
                                                fill={"red"}//{({ theme }) => theme.textSecondary.color}
                                                color="red"//{({ theme }) => theme.textSecondary.color}
                                                width="14px"
                                                height="14px"
                                                name={commentOutline}
                                            />
                                            <TxtReply>{'Reply'}</TxtReply>
                                        </ReplyButton>
                                        {
                                            'replies' in comment && (!Object.keys(commentsWithReplies).includes(comment._id)) &&
                                            <LoadMore onClick={() => LoadReplies(comment)}>
                                                <p style={{ fontSize: 15, fontWeight: 'bold' }}>Load More</p>
                                            </LoadMore>
                                        }
                                    </CommentBox>

                                    { //   G I F T    C O M M E N T 
                                    }
                                    <CommentGifter
                                        {...props}
                                        showGiftAmounts={showGiftAmounts}
                                        comment={comment}
                                        index={index}
                                        setSelectedComment={setSelectedComment}
                                        setShowGiftAmounts={setShowGiftAmounts}
                                        selectedComment={selectedComment}
                                        commentIsReply={false}
                                        //updateReplies={updateReplies}
                                        authUser={authUser}
                                    // setShowOverlay={props.setShowOverlay}
                                    />
                                </CommentContainer>
                                {
                                    Object.keys(commentsWithReplies).includes(comment._id) && <>
                                        <ReplyList
                                            replies={commentsWithReplies[comment._id]}
                                            commentsWithReplies={commentsWithReplies}
                                            setCommentsWithReplies={setCommentsWithReplies}
                                            LoadReplies={LoadReplies}
                                            {...props}

                                            // ----------passed to CommentGifter via ReplyList---------------------
                                            showGiftAmounts={showGiftAmounts}
                                            comment={comment}
                                            index={index}
                                            authUser={authUser}
                                            setSelectedComment={setSelectedComment}
                                            setShowGiftAmounts={setShowGiftAmounts}
                                            selectedComment={selectedComment}
                                            parentComment={comment}
                                        />
                                    </>
                                }
                            </>
                        ))}
                    </CommentsListContainer>
                    : null}
            </>
        )
    }
))

/*
    list of comments which are replies
*/
function ReplyList(props) {
    async function handleReply(reply) {
        props.setParentCommentId(reply._id)
        props.setIsReply(true)
        props.setReplyData({
            type: 'setReply',
            payload: {
                replyTarget: { ...reply.user, _id: reply.userId, commId: reply._id }
            }
        })
    }
    return (
        <>
            {
                props.replies.map((reply, i) => {
                    return <>
                        <CommentContainer style={{ backgroundColor: '#1d2838' }} key={i} comment={reply}>
                            <Avatar
                                src={AvatarUrl(reply.user.avatar, "s")}
                                size={'small'}
                                alt={'Author Avatar'}
                                frame={false}
                                edit={false}
                                userName={reply.user.uname} 
                                userId={reply.user._id}
                                />
                            <CommentBox>
                                <UserName>{reply.user.uname}</UserName>
                                <UserComment>{reply.text}</UserComment>
                                <div
                                    onClick={() => handleReply(reply)}>
                                    { // the "reply" text here should not be selectable with my mouse... only clickable
                                    }
                                    <TxtReply>reply</TxtReply>
                                </div>
                                {
                                    'replies' in reply && (!Object.keys(props.commentsWithReplies).includes(reply._id)) &&
                                    <div onClick={() => props.LoadReplies(reply)}>
                                        <p> ...Load Replies...</p>
                                    </div>
                                }
                                {
                                    Object.keys(props.commentsWithReplies).includes(reply._id) && <>
                                        <ReplyList
                                            replies={props.commentsWithReplies[reply._id]}
                                            commentsWithReplies={props.commentsWithReplies}
                                            setCommentsWithReplies={props.setCommentsWithReplies}
                                        />
                                    </>
                                }
                            </CommentBox>
                            <CommentGifter
                                {...props}
                                comments={props.replies}
                                comment={reply}
                                index={i}
                                commentIsReply={true}
                                parentComment={props.parentComment}
                            />
                        </CommentContainer>
                    </>
                })
            }
        </>
    );
}

/*
    Show gem icon on comments
*/
function CommentGifter(props) {
    const [bounce, setBounce] = useState(0);
    const [size, setSize] = useState(1)

    const [justGifted, setJustGifted] = useState(false);
    const [prevGemCount, setPrevGemCount] = useState(props.comment.gems)

    //   C O N S T A N T S 
    const variantHorizontal = {
        visible: { opacity: 1, x: 50, y: -25 },
        hidden: { opacity: 0, x: 250, y: -25 },
    }

    function Shake() {
        setBounce(-5)
        const timers = setTimeout(() => {
            setBounce(0)
        }, 190)
        return () => clearTimeout(timers)
    }

    function BounceUpDown() {
        setBounce(-10)
        setSize(1.3)
        const timers = setTimeout(() => {
            setBounce(0)
            setSize(1)
        }, 190)
        return () => clearTimeout(timers)
    }

    /*
        CanGiftMinimum()
        Why make a function this simple?
        Foresight! We're going to need to account for the weird 24 hour rule at some point
        William Doyle
        July 30th 2021
    */
    function CanGiftMinimum(_comment, skip = true) {
        // console.log(`STUB: [CommentsList.js] ${_comment.gifted}`);
        if (!skip)
            setPrevGemCount(_comment.gifted);
        if (_comment.gifted + 10 > 2000)
            return false;
        if (_comment.gifted + 10 > 1000) {
            function hasBeen24Hours(__comment) {
                // ------------------------------------------- code for 24 hour stuff

                // -------------------------------------------
                return false;
            }
            if (hasBeen24Hours(_comment))
                return true;
            return false;
        }
        return true;
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

        if (props.comment.userId === props.authUser?._id)
            return true;

        if (!CanGiftMinimum(props.comment))
            return true;

        function gemsGiftedInPastDayExceptMostRecently(_comment) {

            // ------------------------------------------- code for 24 hour stuff

            // -------------------------------------------

            // temp return all gifts given to this comment so far
            return _comment.gifted - prevGemCount;
        }

        if ((prevGemCount < 2000) && (gemsGiftedInPastDayExceptMostRecently(props.comment) < 1000))
            return false;
        return true;
    }

    const commentGem = props.comment.gifted === 0 && props.comment.totalgems === 0 ? GemWhite : Gem

    const closeGiftBar = () => {
        // props.setShowGiftAmounts(false),
        props.setSelectedComment(0)
    }

    useEffect(() => {
        if (!props.showOverlay) {
            // props.setShowGiftAmounts(false),
            props.setSelectedComment(0)
        }
    }, [props.showOverlay]);

    return (
        <>
            <motion.div
                key='giftBarHorizontal'
                variants={variantHorizontal}
                initial={props.showGiftAmounts ? { opacity: 1, x: 50, y: -25 } : { opacity: 0, x: 250, y: -25 }}
                exit={props.showGiftAmounts ? { opacity: 0, x: 0, y: -25 } : { opacity: 1, x: 0, y: -25 }}
                animate={props.showGiftAmounts ? 'visible' : 'hidden'}
                transition={{
                    type: "spring",
                    ease: [0.17, 0.67, 0.83, 0.67],
                    damping: 30,
                    mass: 1,
                    stiffness: 400,
                }}
                style={{ zIndex: props.showGiftAmounts && props.selectedComment._id === props.comment._id ? 999 : 1, overflow: props.showGiftAmounts ? 'visible' : 'hidden' }}
            >
                {
                    props.showGiftAmounts && props.selectedComment._id === props.comment._id && <GiftBarComments
                        style={{ zIndex: 999999 }}
                        sendGems={async amount => {
                            const status = await props.store.giftComment(props.comment, amount);
                            if (status !== -1) {
                                props.pullTrigger();
                                BounceUpDown();
                            }
                        }}
                        itemInfo={{ type: 'comment', id: props.comment._id, isReply: props.commentIsReply }}
                        closeGiftBar={closeGiftBar}
                        parentComment={props.parentComment}
                    />
                }
            </motion.div>
            <div style={{ flexDirection: 'column', alignItems: 'center' }}>
                <div onClick={async () => {
                    setJustGifted(false);
                    const au = await props.store.getAuthUser();
                    // const au = undefined// await props.store.getAuthUser();
                    if (props.comment.userId === au?._id) {
                        Shake(); // shake to indicate user may not gift self
                        return;
                    }
                    if (CanGiftMinimum(props.comment, false) === false) {
                        Shake();
                        return;
                    }
                    props.setSelectedComment(props.comment);
                    props.setShowGiftAmounts(true);
                    setJustGifted(true)
                }}>
                    <motion.div
                        initial={shouldShake() ? { x: 0 } : { y: 0, scale: size, }}
                        animate={shouldShake() ? { x: bounce } : { y: bounce, scale: size, }}
                        transition={{
                            ease: [0.17, 0.67, 0.83, 0.67],
                            type: "spring",
                            damping: props.comment.gifted === 0 ? 13 : 26,
                            mass: 2,
                            stiffness: props.comment.gifted ? 3400 : 1000,
                        }}
                    >
                        <Icon width="24px" height="24px" name={commentGem} />
                    </motion.div>
                </div>
                {
                    (typeof props.comment.totalgems === 'number') && (props.comments[props.index].totalgems > 0) ?
                        <p style={{ fontSize: 13, fontFamily: 'LatoBlack', marginTop: 4, }}>
                            {props.comments[props.index].totalgems > 999 ?
                                <Numeral
                                    className="BoldFontSmall"
                                    value={props.comments[props.index].totalgems}
                                    format={"0.0a"}
                                />
                                : props.comments[props.index].totalgems}
                        </p>
                        : null
                }
            </div>
        </>
    );
}
