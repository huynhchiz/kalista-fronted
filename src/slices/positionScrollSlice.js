import { createSlice } from "@reduxjs/toolkit";

const initPosition = {
    home: 0,
    explore: 0,
    posting: 0,
    myProfile: 0
}

const positionScrollSlice = createSlice({
    name: 'positionScroll',
    initialState: initPosition,
    reducers: {
        setHomePosition: (state, action) => {
            state.home = action.payload
        },
        setExplorePosition: (state, action) => {
            state.explore = action.payload
        },
        setPostingPosition: (state, action) => {
            state.posting = action.payload
        },
        setMyProfilePosition: (state, action) => {
            state.myProfile = action.payload
        },
    }
})

export default positionScrollSlice
