import store from "../redux/store";

import { fetchUserFollowers, fetchUserFollowings, fetchUserInfo, fetchUserPosts } from "../slices/userSlice";
import { getUserFollowersSV, getUserFollowingsSV, getUserInfo, getUserPosts } from "../service/userService";

const dispatchGetUser = (userId) => {
    store.dispatch(fetchUserInfo({
        api: getUserInfo,
        userId: userId
    }))
}

const dispatchGetUserPosts = (userId, limit) => {
    store.dispatch(fetchUserPosts({
        api: getUserPosts,
        userId: userId,
        limit: limit
    }))
}

const dispatchGetUserFollowers = (userId, limit) => {
    store.dispatch(fetchUserFollowers({
        api: getUserFollowersSV,
        userId: userId,
        limit: limit
    }))
}

const dispatchGetUserFollowings = (userId, limit) => {
    store.dispatch(fetchUserFollowings({
        api: getUserFollowingsSV,
        userId: userId,
        limit: limit
    }))
}

export {
    dispatchGetUser,
    dispatchGetUserPosts,
    dispatchGetUserFollowers,
    dispatchGetUserFollowings,


}