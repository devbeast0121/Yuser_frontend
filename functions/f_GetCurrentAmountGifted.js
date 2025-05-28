import f_GetCommentValue from "./f_GetCommentValue";

export default function f_GetCurrentAmountGifted(store, ) {
    const commentGemValue = f_GetCommentValue(store);

    /*
        GetCurrentAmountGifted()
        Get the gem count before we add more gems... 
        William Doyle
        Auguest 2nd 2021
 
        Refactor {
            William Doyle
            April 5th 2022
        }
    */
        return function GetCurrentAmountGifted(itemInfo) {
            if (itemInfo.type === 'comment')
                return commentGemValue(itemInfo.id);

            if (store.local_gifting_state_has(itemInfo.id))  // if has gifted this session...
                return store.local_gifting_state_get(itemInfo.id);

            store.updateLocalGiftingState(null, itemInfo.id, 0)
            return store.localPosts.getById(itemInfo.id).gifted;
        }
}