import store from "../redux/store"

import followSlice, { fetchUserFollowing, fetchUserFollower } from "../slices/followSlices"

import { getUsersFollowingSV, getFollowersSV } from "../service/followService"

const dispatchGetUserFollowing = (limit) => {
    store.dispatch(fetchUserFollowing({
        api: getUsersFollowingSV,
        limit: limit
    }))
}

const dispatchGetUserFollower = (limit) => {
    store.dispatch(fetchUserFollower({
        api: getFollowersSV,
        limit: limit
    }))
}

const dispatchResetFollow = () => {
    store.dispatch(followSlice.actions.resetFollows())
}

export {
    dispatchGetUserFollowing,
    dispatchGetUserFollower,
    dispatchResetFollow
}