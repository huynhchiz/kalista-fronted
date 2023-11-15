import { configureStore } from "@reduxjs/toolkit";

import userLoginSlice from "../slices/userLoginSlice.js";
import themeSlice from "../slices/themeSlice.js";
import loadPageSlice from "../slices/loadPageSlice.js";
import notiModalSlice from "../slices/notiModalSlice.js";
import postsSlice from "../slices/postsSlice.js";
import followSlice from "../slices/followSlices.js";
import otherUserSlice from "../slices/otherUserSlice.js";
import positionScrollSlice from "../slices/positionScrollSlice.js";
import previewPostSlice from "../slices/previewPostSlice.js";
import accountSlice from "../slices/accountSlice.js";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        darkTheme: themeSlice.reducer,
        loadPage: loadPageSlice.reducer,
        notiModal: notiModalSlice.reducer,
        posts: postsSlice.reducer,
        follow: followSlice.reducer,
        otherUser: otherUserSlice.reducer,
        positionScroll: positionScrollSlice.reducer,
        previewPost: previewPostSlice.reducer,

        account: accountSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
    }),
});

export default store;