import React, { useEffect, useRef, useState } from "react";
import {
  CommentBox,
  UserName,
  UserComment,
  TxtReply,
  LoadMore,
  ReplyButton,
} from "../CommentsList/CommentsList.elements";
import { CommentContainer, CommentsListContainer } from "./CommentsListInfiniteScroll.elements";
import commentOutline from "../../public/icons/commentOutline.svg";
import Avatar from ".././Avatar/Avatar";
import Icon from ".././Icon/Icon";
import { clone_nf, AvatarUrl } from "../../stores/tools";
import { inject, observer } from "mobx-react";
import AutolinkerComponent from "../AutolinkerComponent/AutolinkerComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "../../stores/RootStore";
import ScaleLoader from "react-spinners/ScaleLoader";
import { COLORS } from "../../styles/Styling";
import { runInAction } from "mobx";
import ReplyList from "./ReplyList";
import CommentGifter from "./CommentGifter";
import { useTheme } from 'styled-components'
import { useRouter } from "next/router";

export default inject("store")(
  observer(function CommentsListInfiniteScroll(props) {
    const [showGiftAmounts, setShowGiftAmounts] = useState(false);
    const [selectedComment, setSelectedComment] = useState(0);
    const [commentsWithReplies, setCommentsWithReplies] = useState({});
    const [authUser, setAuthUser] = useState(undefined);
    const effectCount = useRef(0);
    const rootstore = useStore();
    const [skip, setSkip] = useState(20);
    const [commentsListInfinite, setCommentsListInfinite] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [continueLoad, setContinueLoad] = useState(true);
    const theme = useTheme()
    const router = useRouter()
    const [hover, setHover] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(0);

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
        comKeys.forEach(
          (comKey) =>
          (clone[comKey] = clone_nf(
            commentsListInfinite.find((c) => c._id == comKey).replies
          ))
        );
        setCommentsWithReplies(clone);
      }

      async function doEffect() {
        runInAction(() => {
          rootstore.changeComment = false;
        });
        //The function to update infinitescroll
        let commentsList = rootstore.commentsList;
        setCommentsListInfinite(commentsList)
        if (commentsList.length === 0) {
          commentsList = await rootstore.getComments(props.targetPostId, 0);
          runInAction(() => {
            rootstore.commentsList = commentsList;
          });
        }
        setCommentsListInfinite(commentsList);
        if (commentsList.length < props.postComments) {
          setHasMore(true);
        } else setHasMore(false);
        if (commentsList.length === 0) {
          setHasMore(false)
          setContinueLoad(false);
        }
        const postId = props.store.localPosts.getById(props.targetPostId)

        updateReplies();
        if (effectCount.current === 0)
          setAuthUser(await props.store.getAuthUser());
        effectCount.current++;
      }
      doEffect();
      return function cleanup() {
        setCommentsListInfinite(null);
      }
    }, [rootstore.changeComment]);

    async function handleCommentReplies(comment) {
      props.setParentCommentId(comment._id);
      props.setIsReply(true);
      props.setReplyData({
        type: "setReply",
        payload: {
          replyTarget: {
            ...comment.user,
            _id: comment.userId,
            commId: comment._id,
          },
        },
      });
    }

    async function pullToRefresh() {
      setPullRefresh(true);
    }
    ////////////////////////////////////////////
    //  STUFF FOR GIFTING COMMENTS//////////////
    ////////////////////////////////////////////

    const fetchMoreComments = async () => {
      let commentsList = await rootstore.getComments(
        props.targetPostId,
        skip,
        true
      );
      if (commentsList.length === 0) {
        setHasMore(false);
      }

      setSkip(skip + 20);
      let totalComments = commentsListInfinite.concat(commentsList);
      runInAction(() => {
        rootstore.commentsList = totalComments;
      });
      setCommentsListInfinite(totalComments);
    };

    ////////////////////////////////////////////
    //Clear the commentsList every time the component unmounts
    useEffect(() => {
      return () => {
        runInAction(() => {
          rootstore.commentsList = [];
        });
      };
    }, []);
    const unamePress=(userName)=>{
      window.open('/' + userName,'_ blank')
    }

    function onCommentHover(value, commentId) {
      setSelectedCommentId(commentId);
      setHover(value);
    }

    const height = window.innerHeight - props.userContainerHeight - 80 - 60 // horizontal side bar is 80px; text input box is 60px 
    const replyIconColor= theme.name === "dark" ? COLORS.white : COLORS.black

    return (
      <>
        {commentsListInfinite.length !== 0 ? (
          <InfiniteScroll
            dataLength={commentsListInfinite.length}
            hasMore={hasMore}
            loader={
              hasMore ? (
                <div style={{ alignSelf: "center" }}>
                  <ScaleLoader
                    color={COLORS.purple}
                    loading={true}
                    size={150}
                  />
                </div>
              ) : null
            }
            scrollableTarget="scrollableDiv"
            style={{ width: "100%", display: "flex", flex: 1, flexDirection: "column"}}
            next={fetchMoreComments}
            scrollThreshold={0.5}
            height={height}
            className={"TransparentScrollbar"}
          >
            <CommentsListContainer>
              {commentsListInfinite.map((comment, index) => (
                <div key={index} style={{flexDirection:"column"}}>
                  <CommentContainer
                    onMouseOver={() => onCommentHover(true, comment._id)}
                    onMouseOut={() => onCommentHover(false, comment._id)}
                    hover={hover}
                    commentId={comment._id}
                   // selectedCommentId={selectedComment._id}
                   selectedCommentId={selectedCommentId == comment._id ? true : false}
                  >
                    <Avatar
                      src={AvatarUrl(comment.user.avatar, "s")}
                      size={"small"}
                      alt={"Author Avatar"}
                      frame={false}
                      edit={false}
                      userName={comment.user.uname}
                      userId={comment.userId}
                    />
                    <CommentBox>
                      <UserName onClick={()=>unamePress(comment.user.uname)} style={{cursor:"pointer"}}>{comment.user.uname}</UserName>
                      <UserComment>
                        <AutolinkerComponent text={comment.text} />
                      </UserComment>
                      <ReplyButton
                        onClick={() => handleCommentReplies(comment)}
                      >
                        {
                          // the "reply" text here should not be selectable with my mouse... only clickable
                        }
                        <Icon
                          className="center"
                          //stroke=({ theme }) => theme.oppositeInactiveColor.color
                          //fill=({ theme }) => theme.oppositeInactiveColor.color
                          //The strokecolor is preventing update 
                          strokeColor={replyIconColor}
                          width="14px"
                          height="14px"
                          name={commentOutline}
                        />
                        <TxtReply>Reply</TxtReply>
                      </ReplyButton>
                      {"replies" in comment &&
                        !Object.keys(commentsWithReplies).includes(
                          comment._id
                        ) && (
                          <LoadMore onClick={() => LoadReplies(comment)}>
                            <p style={{ fontSize: 15, fontWeight: "bold" }}>
                              Load More
                            </p>
                          </LoadMore>
                        )}
                    </CommentBox>

                    {
                      //   G I F T    C O M M E N T
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
                      comments={commentsListInfinite}
                      // setShowOverlay={props.setShowOverlay}
                      postId={props.targetPostId}
                    />
                  </CommentContainer>
                  {Object.keys(commentsWithReplies).includes(comment._id) && (
                    <>
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
                        postId={props.targetPostId}
                      />
                    </>
                  )}
                </div>
              ))}
            </CommentsListContainer>
          </InfiniteScroll>
        ) : (
          continueLoad && (
            <div style={{ alignSelf: "center" }}>
              <ScaleLoader color={COLORS.purple} loading={true} size={150} />
            </div>
          )
        )}
      </>
    );
  })
);