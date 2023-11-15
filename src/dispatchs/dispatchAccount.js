import store from "../redux/store";
import { fetchAccountFollowers, fetchAccountFollowings, fetchAccountInfo, refreshToken } from "../slices/accountSlice";

import { getAccountFollowersSV, getAccountFollowingsSV, getAccountInfoSV, refreshTokenSV } from "../service/accountService";

const dispatchGetAccount = () => {
    store.dispatch(fetchAccountInfo(getAccountInfoSV))
}

const dispatchRefreshToken = () => {
    store.dispatch(refreshToken(refreshTokenSV))
}

const dispatchGetAccountFollowers = () => {
    store.dispatch(fetchAccountFollowers(getAccountFollowersSV))
}

const dispatchGetAccountFollowings = () => {
    store.dispatch(fetchAccountFollowings(getAccountFollowingsSV))
}

export {
    dispatchGetAccount,
    dispatchRefreshToken,
    dispatchGetAccountFollowers,
    dispatchGetAccountFollowings
}