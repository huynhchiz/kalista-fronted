import { createSlice } from "@reduxjs/toolkit";

const loadPageSlice = createSlice({
    name: 'loadPage',
    initialState: { isShow: false },
    reducers: {
        toggleShow: (state, action) => {
            state.isShow = !state.isShow
        }
    }
})

export default loadPageSlice