import React from "react";
import {
    CommentBox,
    UserName,
    UserComment,
    TxtReply,
    ReplyButton,
} from "../CommentsList/CommentsList.elements";
import { CommentContainer } from "./CommentsListInfiniteScroll.elements";
import Avatar from ".././Avatar/Avatar";
import { AvatarUrl } from "../../stores/tools";
import CommentGifter from "./CommentGifter";
import { f_handleReply } from "./Common";
import Icon from ".././Icon/Icon";
import commentOutline from "../../public/icons/commentOutline.svg";

function Reply(props) {
    const { reply, handleReply, i } = props;
    return (
        <>
            <CommentContainer
                key={i}
                comment={reply}
            >
                <Avatar
                    src={AvatarUrl(reply.user.avatar, "s")}
                    size={"small"}
                    alt={"Author Avatar"}
                    frame={false}
                    edit={false}
                    userName={reply.user.uname}
                    userId={reply.userId}
                />
                <CommentBox>
                    <UserName>{reply.user.uname}</UserName>
                    <UserComment>{reply.text}</UserComment>
                    <ReplyButton
                        onClick={() => handleReply(reply)}
                      >
                        {
                          // the "reply" text here should not be selectable with my mouse... only clickable
                        }
                        <Icon
                          className="center"
                          stroke={({ theme }) => theme.oppositeInactiveColor.color}
                          fill={({ theme }) => theme.oppositeInactiveColor.color}
                          //The strokecolor is preventing update
                          //strokeColor={({ theme }) => theme.iconColor.color}
                          width="14px"
                          height="14px"
                          name={commentOutline}
                        />
                        <TxtReply>Reply</TxtReply>
                      </ReplyButton>
                    {/* <div onClick={() => handleReply(reply)}>
                        <TxtReply>reply</TxtReply>
                    </div> */}
                    {
                        "replies" in reply &&
                            !Object.keys(props.commentsWithReplies).includes(
                                reply._id
                            ) && (
                                <div onClick={() => props.LoadReplies(reply)}>
                                    <p> ...Load Replies...</p>
                                </div>
                            )

                        // (() => {
                        //     if (!"replies" in reply)
                        //         return;

                        //     if (Object.keys(props.commentsWithReplies).includes(reply._id))
                        //         return;

                        //     return (<div onClick={() => props.LoadReplies(reply)}>
                        //         <p> ...Load Replies...</p>
                        //     </div>)
                        // })()

                    }
                    {Object.keys(props.commentsWithReplies).includes(reply._id) && (
                        <>
                            <ReplyList
                                replies={props.commentsWithReplies[reply._id]}
                                commentsWithReplies={props.commentsWithReplies}
                                setCommentsWithReplies={props.setCommentsWithReplies}
                            />
                        </>
                    )}
                </CommentBox>
                <CommentGifter
                    {...props}
                    comments={props.replies}
                    comment={reply}
                    index={i}
                    commentIsReply={true}
                    parentComment={props.parentComment}
                    postId={props.postId}
                />
            </CommentContainer>
        </>

    )
}

/*
  Reply List
  ../CommentsListInfiniteScroll/ReplyList.js
  Not inside own folder because it is not used anywhere else on the site
*/
export default function ReplyList(props) {
    const handleReply = f_handleReply(props);

    return <>
        {props.replies.map((reply, i) => <Reply {...props} reply={reply} key={i} i={i} handleReply={handleReply} />)}
    </>
}
