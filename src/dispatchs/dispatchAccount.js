import store from "../redux/store";
import accountSlice, { fetchAccountAvatar, fetchAccountFollowers, fetchAccountFollowings, fetchAccountInfo, fetchAccountPosts, fetchInfoPostAccount, refreshToken } from "../slices/accountSlice";

import { getAccountAvatarSV, getAccountFollowersSV, getAccountFollowingsSV, getAccountInfoSV, getAccountPosts, refreshTokenSV } from "../service/accountService";
import { dispatchResetHomePosts } from "./dispatchPosts";
import { dispatchResetScrollPosition } from "./dispatchScrollPosition";
import { dispatchSetError } from "./dispatchPageAction";
import { getInfoPostSV } from "../service/postService";

const dispatchLogin = (dataLogin) => {
    store.dispatch(accountSlice.actions.login(dataLogin))
    dispatchResetScrollPosition()
}

const dispatchLogout = () => {
    store.dispatch(accountSlice.actions.logout())
    dispatchResetHomePosts()
    dispatchResetScrollPosition()
    dispatchSetError(false)
}

const dispatchGetAccount = () => {
    store.dispatch(fetchAccountInfo(getAccountInfoSV))
}

const dispatchGetAccountAvatar = () => {
    store.dispatch(fetchAccountAvatar({
        api: getAccountAvatarSV
    }))
}

const dispatchRefreshToken = () => {
    store.dispatch(refreshToken(refreshTokenSV))
}

const dispatchGetAccountFollowers = (limit) => {
    store.dispatch(fetchAccountFollowers({
        api: getAccountFollowersSV,
        limit: limit
    }))
}

const dispatchGetAccountFollowings = (limit) => {
    store.dispatch(fetchAccountFollowings({
        api: getAccountFollowingsSV,
        limit: limit
    }))
}

const dispatchGetAccountPosts = (limit) => {
    store.dispatch(fetchAccountPosts({
        api: getAccountPosts,
        limit: limit,
    }))
}

const dispatchGetInfoPostAccount = (postId) =>  {
    store.dispatch(fetchInfoPostAccount({
        api: getInfoPostSV,
        postId: postId
    }))
}

export {
    dispatchLogin,
    dispatchLogout,
    dispatchGetAccount,
    dispatchGetAccountAvatar,
    dispatchRefreshToken,
    dispatchGetAccountFollowers,
    dispatchGetAccountFollowings,
    dispatchGetAccountPosts,
    dispatchGetInfoPostAccount,
}