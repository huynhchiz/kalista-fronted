import store from "../redux/store";

import errorSlice from "../slices/errorSlice";
import loadPageSlice from "../slices/loadPageSlice"
import notiModalSlice from "../slices/notiModalSlice"
import themeSlice from "../slices/themeSlice"

export const dispatchSetError = (status) =>  {
    store.dispatch(errorSlice.actions.setStatus(status))
}

export const dispatchLoadPage = () => {
    store.dispatch(loadPageSlice.actions.toggleLoadPage())
}

export const dispatchNoti = (message) => {
    store.dispatch(notiModalSlice.actions.setMessage(message))
    store.dispatch(notiModalSlice.actions.setShow())
}

export const dispatchToggleTheme = () => {
    store.dispatch(themeSlice.actions.toggleTheme())
}