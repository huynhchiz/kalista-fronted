import store from "../redux/store"

import { fetchHomePosts, fetchExplorePosts, fetchUserPosts } from "../slices/postsSlice"

import { getFollowingPosts, getNotFollowingPosts, getUserPosts } from "../service/postService"

const dispatchGetHomePosts = (limit) => {
    store.dispatch(fetchHomePosts({
        api: getFollowingPosts,
        limit: limit
    }))
}

const dispatchGetExplorePosts = (limit) => {
    store.dispatch(fetchExplorePosts({
        api: getNotFollowingPosts,
        limit: limit
    }))
}

const dispatchGetUserPosts = (email, limit) => {
    store.dispatch(fetchUserPosts({
        api: getUserPosts,
        email: email,
        limit: limit
    }))
}

export {
    dispatchGetHomePosts,
    dispatchGetExplorePosts,
    dispatchGetUserPosts
}