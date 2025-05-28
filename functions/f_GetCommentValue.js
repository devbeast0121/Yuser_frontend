import calculateCurrentAmountGifted from "./calculateCurrentGiftAmount";

/*
    factory to make a function to get the amount gifted to the comment by the current user
    William Doyle
    April 6th 2022
*/
export default function f_GetCommentValue(store) {
    return function commentGemValue(commentId) {
        if (store.localGiftingState.has(commentId))
            return calculateCurrentAmountGifted ( store.localGiftingState.getAmountGifted(commentId) )  ( store.commentsMaster.getComment(commentId)?.totalgems )  ( store.commentsMaster.getComment(commentId)?.gifted )
        return store.commentsMaster.getComment(commentId)?.totalgems ?? 0;
    }
}