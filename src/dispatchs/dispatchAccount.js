import store from "../redux/store";
import accountSlice, { fetchAccountAvatar, fetchAccountFollowers, fetchAccountFollowings, fetchAccountInfo, fetchAccountPosts, login, refreshToken } from "../slices/accountSlice";

import { getAccountAvatarSV, getAccountFollowersSV, getAccountFollowingsSV, getAccountInfoSV, getAccountPosts, refreshTokenSV } from "../service/accountService";
import { dispatchResetHomePosts } from "./dispatchPosts";
import { dispatchResetScrollPosition } from "./dispatchScrollPosition";

const dispatchLogin = (dataLogin) => {
    store.dispatch(accountSlice.actions.login(dataLogin))
    dispatchResetScrollPosition()
}

const dispatchLogout = () => {
    store.dispatch(accountSlice.actions.logout())
    dispatchResetHomePosts()
    dispatchResetScrollPosition()
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

export {
    dispatchLogin,
    dispatchLogout,
    dispatchGetAccount,
    dispatchGetAccountAvatar,
    dispatchRefreshToken,
    dispatchGetAccountFollowers,
    dispatchGetAccountFollowings,
    dispatchGetAccountPosts,
}