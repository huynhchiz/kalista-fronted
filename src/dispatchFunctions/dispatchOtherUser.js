import store from "../redux/store"

import { fetchOtherUserInfo,
         fetchOtherUserPosts,
         fetchOtherUserFollowers,
         fetchOtherUserFollowings } from "../slices/otherUserSlice"

import { getOtherUserInfoSV } from "../service/userService"
import { getUserPosts } from "../service/postService"
import { getUsersFollowingSV, getFollowersSV } from "../service/followService"

const dispatchFetchOtherUserInFo = (email) => {
    store.dispatch(fetchOtherUserInfo(getOtherUserInfoSV(email)))
}

const dispatchFetchOtherUserPosts = (email, limit) => {
    store.dispatch(fetchOtherUserPosts(getUserPosts({
        api: getUserPosts,
        email: email,
        limit: limit
    })))
}

const dispatchFetchOtherUserFollowers = (email) => {
    store.dispatch(fetchOtherUserFollowers(getFollowersSV(email)))
}

const dispatchFetchOtherUserFollowings = (email) => {
    store.dispatch(fetchOtherUserFollowings(getUsersFollowingSV(email)))
}

export {
    dispatchFetchOtherUserInFo,
    dispatchFetchOtherUserPosts,
    dispatchFetchOtherUserFollowers,
    dispatchFetchOtherUserFollowings
}