import { configureStore } from "@reduxjs/toolkit";

// import userLoginSlice from "../slices/userLoginSlice.js";
import themeSlice from "../slices/themeSlice.js";
import loadPageSlice from "../slices/loadPageSlice.js";
import notiModalSlice from "../slices/notiModalSlice.js";
// import postsSlice from "../slices/postsSlice.js";
import followSlice from "../slices/followSlices.js";
import otherUserSlice from "../slices/otherUserSlice.js";
import positionScrollSlice from "../slices/positionScrollSlice.js";
import previewPostSlice from "../slices/previewPostSlice.js";
import accountSlice from "../slices/accountSlice.js";
import homePostsSlice from "../slices/homePostsSlice.js";
import errorSlice from "../slices/errorSlice.js";
import userSlice from "../slices/userSlice.js";
import commentSlice from "../slices/commentSlice.js";

const store = configureStore({
    reducer: {
        // userLogin: userLoginSlice.reducer,
        darkTheme: themeSlice.reducer,
        loadPage: loadPageSlice.reducer,
        notiModal: notiModalSlice.reducer,
        // posts: postsSlice.reducer,
        follow: followSlice.reducer,
        otherUser: otherUserSlice.reducer,
        positionScroll: positionScrollSlice.reducer,
        previewPost: previewPostSlice.reducer,

        account: accountSlice.reducer,
        error: errorSlice.reducer,
        homePosts: homePostsSlice.reducer,
        user: userSlice.reducer,
        comments: commentSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
    }),
});

export default store;