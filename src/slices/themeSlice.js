import { createSlice } from "@reduxjs/toolkit";

let initDarkTheme = JSON.parse(localStorage.getItem('darkTheme')) || false

const themeSlice = createSlice({
    name: 'darkTheme',
    initialState: { darkTheme: initDarkTheme },
    reducers: {
        toggleTheme: (state, action) => {
            state.darkTheme = !state.darkTheme
            localStorage.setItem('darkTheme', JSON.stringify(state.darkTheme))
        }
    }
})

export default themeSlice