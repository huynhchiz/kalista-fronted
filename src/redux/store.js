import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userLoginSlice from "./userLoginSlice";
import loadPageSlice from "./loadPageSlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        theme: themeSlice.reducer,
        loadPage: loadPageSlice.reducer
    }
})

export default store