export default class CommentsMaster {
    constructor() {
        this.record = new Map();
    }

    // Add a comment to the record
    addComment(comment) {
        if (comment?.replies?.length > 0) {
            // also add replies as if they were comments
            for (const reply of comment.replies) 
                this.addComment(reply);
        }
        this.record.set(comment._id, comment);
    }

    // Get a comment from the record
    getComment(commentId) {
        return this.record.get(commentId);
    }

    hasComment(commentId) {
        return this.record.has(commentId);
    }

    /*
        forgetComment
        Forget a comment from the record
        in -> commentId :: String
        out -> success :: Boolean
        William Doyle
        April 6th 2022
        This Map may prevent the garbage collector from collecting the comment object after we don't need it anymore. 
        Huh, I guess this is what Garth Santor meant when he said learning C and C++ would make me a better programmer 
        even in languages with garbage collection.
    */
    forgetCommet(commentId) {
        return this.record.delete(commentId);
    }
}