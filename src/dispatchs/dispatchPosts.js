import store from "../redux/store";

import homePostsSlice, { fetchHomePosts } from "../slices/homePostsSlice";
import { getHomePosts } from "../service/postService";

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

export {
    dispatchGetHomePosts,
    dispatchAddLimitHomePosts,
    dispatchResetHomePosts
}