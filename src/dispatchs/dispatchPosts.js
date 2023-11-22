import store from "../redux/store";

import homePostsSlice, { fetchHomePosts, fetchInfoPostHome } from "../slices/homePostsSlice";
import { getExplorePosts, getHomePosts, getInfoPostSV } from "../service/postService";
import explorePostsSlice, { fetchExplorePosts, fetchInfoPostExplore } from "../slices/explorePostsSlice";

// home posts
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

// explore posts
const dispatchGetExplorePosts = (limit) => {
    store.dispatch(fetchExplorePosts({
        api: getExplorePosts,
        limit: limit
    }))
}

const dispatchAddLimitExplorePosts = (limit) => {
    store.dispatch(explorePostsSlice.actions.addLimit(limit))
}

const dispatchGetInfoPostExplore = (postId) =>  {
    store.dispatch(fetchInfoPostExplore({
        api: getInfoPostSV,
        postId: postId
    }))
}

export {
    dispatchGetHomePosts,
    dispatchAddLimitHomePosts,
    dispatchResetHomePosts,
    dispatchGetInfoPostHome,

    dispatchGetExplorePosts,
    dispatchAddLimitExplorePosts,
    dispatchGetInfoPostExplore,


}