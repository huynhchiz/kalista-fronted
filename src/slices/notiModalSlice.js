import { createSlice } from "@reduxjs/toolkit";

const notiModalSlice = createSlice({
    name: 'noti',
    initialState: { text: 'notification' },
    reducers: {
        setMessage: (state, action) => {
            state.text = action.payload
        }
    }
})

export default notiModalSlice