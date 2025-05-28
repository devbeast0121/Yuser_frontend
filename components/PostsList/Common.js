import Loader from '../../pages/api/posts';
import LocalPosts from '../../stores/LocalPosts';

/*
    William Doyle
    April 1st 2022
    factory for functions to "handle view comments"
*/
export function f_handleViewComments(setComments, setPostId) {
    if ((typeof setComments !== 'function') || (typeof setPostId !== 'function'))
        throw new Error('f_handleViewComments: setComments and setPostId must be functions');

    /*
        handleViewComments()
        Load comments on the provided post and set them to be viewable
        William Doyle
        July 19th 2021
    */
    return async post => {
        await Loader.LoadComments(post._id);
        setComments(LocalPosts.getInstance().comments);
        setPostId(post._id);
    }
} 