import store from "../redux/store";

import positionScrollSlice from "../slices/positionScrollSlice";

const dispatchSetScrollHome = (position) => {
    store.dispatch(positionScrollSlice.actions.setHomePosition(position))
}

const dispatchSetScrollExplore = (position) => {
    store.dispatch(positionScrollSlice.actions.setExplorePosition(position))
}

const dispatchSetScrollMyProfile = (position) => {
    store.dispatch(positionScrollSlice.actions.setMyProfilePosition(position))
}

const dispatchResetScrollPosition = () => {
    dispatchSetScrollHome(0)
    dispatchSetScrollExplore(0)
    dispatchSetScrollMyProfile(0)
}


export {
    dispatchSetScrollHome,
    dispatchSetScrollExplore,
    dispatchSetScrollMyProfile,
    dispatchResetScrollPosition
}