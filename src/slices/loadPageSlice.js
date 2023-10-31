import { createSlice } from "@reduxjs/toolkit";

const loadPageSlice = createSlice({
    name: 'loadPage',
    initialState: { loadPage: false },
    reducers: {
        toggleLoadPage: (state, action) => {
            state.loadPage = !state.loadPage
        }
    }
})

export default loadPageSlice
