import { createSlice } from "@reduxjs/toolkit";

const notiModalSlice = createSlice({
    name: 'noti',
    initialState: { show: false, text: 'notification' },
    reducers: {
        setMessage: (state, action) => {
            state.text = action.payload
        },
        setShow: (state, action) => {
            state.show = !state.show
        }
    }
})

export default notiModalSlice