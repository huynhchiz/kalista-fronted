import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: { status: 'idle', darkTheme: false },
    reducers: {
        toggleTheme: (state, action) => {
            state.darkTheme = !state.darkTheme
        }
    }
})

export default themeSlice