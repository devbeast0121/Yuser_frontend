const currentAmountGiftedByMe = (store, itemInfo) => {
    // const {store, itemInfo} = props;

    if (itemInfo.type === 'comment') {
        if (store.localGiftingState.has(itemInfo.id))
            return store.localGiftingState.getAmountGifted(itemInfo.id);
        return store.commentsMaster.getComment(itemInfo.id)?.gifted
    }

    if (store.local_gifting_state_has(itemInfo.id))  // if has gifted this session...
        return store.local_gifting_state_get(itemInfo.id);

    return store.localPosts.getById(itemInfo.id).gifted;
}

export default currentAmountGiftedByMe