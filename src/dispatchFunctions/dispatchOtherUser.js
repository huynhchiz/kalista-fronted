import store from "../redux/store"

import { fetchOtherUserInfo,
         fetchOtherUserPosts,
         fetchOtherUserFollowers,
         fetchOtherUserFollowings } from "../slices/otherUserSlice"

import { getOtherUserInfoSV } from "../service/userService"
import { getUserPosts } from "../service/postService"
import { getUsersFollowingSV, getFollowersSV } from "../service/followService"

const dispatchFetchOtherUserInFo = (email) => {
    store.dispatch(fetchOtherUserInfo({
        api: getOtherUserInfoSV,
        email: email
    }))
}

const dispatchFetchOtherUserPosts = (email, limit) => {
    store.dispatch(fetchOtherUserPosts({
        api: getUserPosts,
        email: email,
        limit: limit
    }))
}

const dispatchFetchOtherUserFollowers = (email) => {
    store.dispatch(fetchOtherUserFollowers({
        api: getFollowersSV,
        email: email
    }))
}

const dispatchFetchOtherUserFollowings = (email) => {
    store.dispatch(fetchOtherUserFollowings({
        api: getUsersFollowingSV,
        email: email
    }))
}

export {
    dispatchFetchOtherUserInFo,
    dispatchFetchOtherUserPosts,
    dispatchFetchOtherUserFollowers,
    dispatchFetchOtherUserFollowings
}