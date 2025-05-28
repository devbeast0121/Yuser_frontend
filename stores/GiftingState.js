function isContentId(candidate) {
    if ((typeof candidate !== 'string') || (candidate.length !== '61e070953a1c3a002677fdd5'.length))
        return false;
    return true;
}

// throw an error if the param does not look like a content id
function checkContentIdType(candidate) {
    if (!isContentId(candidate))
        throw new Error(`Cannot gift item with id '${candidate}' because it is an invalid value.`);
}

// throw error if param is not a number
function checkNumberType(candidate) {
    if (typeof candidate !== 'number')
        throw new Error(`candidate ('${candidate}') is not a number`);
}

/*
    GiftingState
    Maintain a mapping from content ids to the amount the authenticated user has gifted said content
    Also provides type checking.
    William Doyle
    March 14th 2022
*/
export default class GiftingState {

    constructor() {
        this.known_content = new Map();
    }

    addContent(content_id, amount_gifted_to_content_so_far) {
        checkContentIdType(content_id);
        checkNumberType(amount_gifted_to_content_so_far);
        this.known_content.set(content_id, amount_gifted_to_content_so_far);
    }

    getAmountGifted(content_id) {
        checkContentIdType(content_id);
        return this.known_content.get(content_id);
    }
}