import store from "../redux/store"

import loadPageSlice from "../slices/loadPageSlice"
import notiModalSlice from "../slices/notiModalSlice"
import userLoginSlice from "../slices/userLoginSlice"
import themeSlice from "../slices/themeSlice"

import { getAccount, refreshNewAccessToken, getUserAvatar } from "../slices/userLoginSlice"
import { getAccountService, refreshNewToken, getUserAvatar as getAvatarSV } from "../service/userService"

const dispatchLogin = (data) => {
    store.dispatch(userLoginSlice.actions.login(data))
}

const dispatchLogout = () => {
    store.dispatch(userLoginSlice.actions.logoutUser())
}

const dispatchLoadPage = () => {
    store.dispatch(loadPageSlice.actions.toggleLoadPage())
}

const dispatchNoti = (message) => {
    store.dispatch(notiModalSlice.actions.setMessage(message))
    store.dispatch(notiModalSlice.actions.setShow())
}

const dispatchGetAccount = () => {
    store.dispatch(getAccount(getAccountService))
}

const dispatchRefreshToken = () => {
    store.dispatch(refreshNewAccessToken(refreshNewToken))
}

const dispatchGetUserAvt = () => {
    store.dispatch(getUserAvatar(getAvatarSV))
}

const dispatchToggleTheme = () => {
    store.dispatch(themeSlice.actions.toggleTheme())
}

export {
    dispatchLogin,
    dispatchLogout,
    dispatchLoadPage,
    dispatchNoti,
    dispatchGetAccount,
    dispatchRefreshToken,
    dispatchGetUserAvt,
    dispatchToggleTheme
}