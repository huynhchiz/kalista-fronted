import store from "../redux/store";
import { getInfoOneCommentSV, getPostCommentsSV } from "../service/postService";
import commentSlice, { fetchInfoComment, fetchPostComments } from "../slices/commentSlice";

const dispatchGetPostComments = (postId, limit) => {
    store.dispatch(fetchPostComments({
        api: getPostCommentsSV,
        postId: postId,
        limit: limit
    }))
}

const dispatchGetInfoComment = (commentId) => {
    store.dispatch(fetchInfoComment({
        api: getInfoOneCommentSV,
        commentId: commentId
    }))
}

const dispatchResetComments = () => {
    store.dispatch(commentSlice.actions.resetComments())
}

export {
    dispatchGetPostComments,
    dispatchResetComments,
    dispatchGetInfoComment
}