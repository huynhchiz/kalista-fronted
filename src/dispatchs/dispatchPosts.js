import store from "../redux/store";

import homePostsSlice, { fetchHomePosts, fetchInfoPostHome } from "../slices/homePostsSlice";
import { getHomePosts, getInfoPostSV } from "../service/postService";

const dispatchGetHomePosts = (limit) => {
    store.dispatch(fetchHomePosts({
        api: getHomePosts,
        limit: limit
    }))
}

const dispatchAddLimitHomePosts = (limit) => {
    store.dispatch(homePostsSlice.actions.addLimit(limit))
}

const dispatchResetHomePosts = () => {
    store.dispatch(homePostsSlice.actions.resetPosts())
}

const dispatchGetInfoPostHome = (postId) =>  {
    store.dispatch(fetchInfoPostHome({
        api: getInfoPostSV,
        postId: postId
    }))
}

export {
    dispatchGetHomePosts,
    dispatchAddLimitHomePosts,
    dispatchResetHomePosts,
    dispatchGetInfoPostHome
}