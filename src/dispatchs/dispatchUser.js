import store from "../redux/store";
// import { fetchAccountFollowers, fetchAccountFollowings, fetchAccountInfo, fetchAccountPosts } from "../slices/accountSlice";

// import { getAccountFollowersSV, getAccountFollowingsSV, getAccountInfoSV, getAccountPosts } from "../service/accountService";
import { fetchUserInfo, fetchUserPosts } from "../slices/userSlice";
import { getUserInfo, getUserPosts } from "../service/userService";

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


export {
    dispatchGetUser,
    dispatchGetUserPosts,
}