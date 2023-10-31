import { configureStore } from "@reduxjs/toolkit";

import userLoginSlice from "../slices/userLoginSlice.js";
import themeSlice from "../slices/themeSlice.js";
import loadPageSlice from "../slices/loadPageSlice.js";
import notiModalSlice from "../slices/notiModalSlice.js";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        darkTheme: themeSlice.reducer,
        loadPage: loadPageSlice.reducer,
        notiModal: notiModalSlice.reducer
    }
})

export default store