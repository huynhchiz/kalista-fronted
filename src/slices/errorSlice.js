import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'error',
    initialState: { status: false },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        } 
    }
})

export default errorSlice