/*
    Common functions for CommentsListInfinteScroll and sub componets
    William Doyle
    March 31st 2022
    Best to seperate state from logic for this kind of stuff. So all functions here will be pure. This may require some refactoring.
*/

export function f_handleReply(props) {
    return async comment => {
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
}