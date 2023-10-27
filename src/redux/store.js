import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userLoginSlice from "./userLoginSlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        theme: themeSlice.reducer,
    }
})

export default store