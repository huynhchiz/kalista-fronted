import store from "../redux/store";
import { getPostCommentsSV } from "../service/postService";
import { fetchPostComments } from "../slices/commentSlice";

const dispatchPostComments = (postId, limit) => {
    store.dispatch(fetchPostComments({
        api: getPostCommentsSV,
        postId: postId,
        limit: limit
    }))
}

export {
    dispatchPostComments
}