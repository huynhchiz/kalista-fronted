import { createSlice } from "@reduxjs/toolkit";

const unZoom = {
    status: false,
    src: '',
    alt: '',
}

const zoomImageSlice = createSlice({
    name: 'zoomImage',
    initialState: { zoomImageState: unZoom },
    reducers: {
        handleZoomImage: (state, action) => {
            state.zoomImageState = action.payload
        },
        handleUnZoomImage: (state, action) => {
            state.zoomImageState = unZoom
        },
    }
})

export default zoomImageSlice