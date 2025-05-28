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

// throw error if param is not a positive number
function checkPositiveNumberType(candidate) {
    checkNumberType(candidate);
    if (candidate < 0)
        throw new Error(`candidate ('${candidate}') is not a positive number`);
}

/*
    GiftingState
    Maintain a mapping from content ids to the amount the authenticated user has gifted said content
    Also provides type checking.
    William Doyle
    March 14th 2022
*/
export default class GiftingStateModel {

    constructor() {
        this.known_content = new Map();
    }

    /*
        addContent
        typecheck params, then use them to add (or update) a key value pair in the `known_content` map

    */
    addContent(content_id, amount_gifted_to_content_so_far) {
        checkContentIdType(content_id);
        checkNumberType(amount_gifted_to_content_so_far);
        this.known_content.set(content_id, amount_gifted_to_content_so_far);
    }

    // add content only if it is more recent (higher because users cannot 'ungift') than the current value
    maybeAddContent(content_id, amount_gifted_to_content_so_far) {
        checkContentIdType(content_id);
        checkNumberType(amount_gifted_to_content_so_far);

        const current_value = this.known_content.get(content_id);
        
        if ((!current_value) || (current_value < amount_gifted_to_content_so_far))
            return this.addContent(content_id, amount_gifted_to_content_so_far);
    }

    getAmountGifted(content_id) {
        checkContentIdType(content_id);
        return this.known_content.get(content_id);
    }

    addGift(content_id, additional_gift) {
        checkContentIdType(content_id);
        checkPositiveNumberType(additional_gift);

        const previousGifts = this.getAmountGifted(content_id);
        if (typeof previousGifts !== 'number') {    // this is the first time the user has gifted this content
            // this.addContent(content_id, additional_gift); // this is wrong
            // return;
            throw new Error(`unknown content id. Cannot add gift to local state. Please add the post with addContent() or maybeAddContent()`);
        }

        const new_total_gifted = previousGifts + additional_gift;
        this.addContent(content_id, new_total_gifted);
        // console.log(`STUB: gift of ${additional_gift} added to internal state`);
    }

    has(content_id) {
        checkContentIdType(content_id);
        return this.known_content.has(content_id);
    }
}