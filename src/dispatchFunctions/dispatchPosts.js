import store from "../redux/store"

import postsSlice, { fetchHomePosts, fetchExplorePosts, fetchUserPosts } from "../slices/postsSlice"

import { getFollowingPosts, getNotFollowingPosts, getUserPosts, previewOnePost } from "../service/postService"
import { fetchOnePreviewPost } from "../slices/previewPostSlice"

const dispatchGetHomePosts = (limit) => {
    store.dispatch(fetchHomePosts({
        api: getFollowingPosts,
        limit: limit
    }))
}
const dispatchAddLimitHomePosts = (limit) => {
    store.dispatch(postsSlice.actions.addHomeLimit(limit))
}

const dispatchGetExplorePosts = (limit) => {
    store.dispatch(fetchExplorePosts({
        api: getNotFollowingPosts,
        limit: limit
    }))
}
const dispatchAddLimitExplorePosts = (limit) => {
    store.dispatch(postsSlice.actions.addExploreLimit(limit))
}

const dispatchGetUserPosts = (email, limit) => {
    store.dispatch(fetchUserPosts({
        api: getUserPosts,
        email: email,
        limit: limit
    }))
}
const dispatchAddLimitUserPosts = (limit) => {
    store.dispatch(postsSlice.actions.addUserPostsLimit(limit))
}

const dispatchResetPosts = () => {
    store.dispatch(postsSlice.actions.resetPosts())
}

const dispatchPreviewOnePost = (postId) => {
    store.dispatch(fetchOnePreviewPost({
        api: previewOnePost,
        postId: postId
    }))
}

export {
    dispatchGetHomePosts,
    dispatchGetExplorePosts,
    dispatchGetUserPosts,
    dispatchAddLimitHomePosts,
    dispatchAddLimitExplorePosts,
    dispatchAddLimitUserPosts,
    dispatchResetPosts,
    dispatchPreviewOnePost

}