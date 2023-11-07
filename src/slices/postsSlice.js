import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        homePosts: [],
        explorePosts: [],
        userPosts: []
    },
    extraReducers: builder =>
    builder
        .addCase(fetchHomePosts.fulfilled, (state, action) => {
            state.homePosts = action.payload;
        })
        .addCase(fetchHomePosts.rejected, (state, action) => {
            state.homePosts = [];
        })

        .addCase(fetchExplorePosts.fulfilled, (state, action) => {
            state.explorePosts = action.payload;
        })
        .addCase(fetchExplorePosts.rejected, (state, action) => {
            state.explorePosts = [];
        })

        .addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.userPosts = action.payload;
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
            state.userPosts = [];
        })
})

export const fetchHomePosts = createAsyncThunk('posts/fetchHomePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        console.log(res.DT);
        return res.DT;
    };
    return [];
})

export const fetchExplorePosts = createAsyncThunk('posts/fetchExplorePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        console.log(res.DT);
        return res.DT;
    };
    return [];
})

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async ({api, email, limit}) => {
    let res = await api( email, limit)
    if (res && +res.EC === 0) {
        return res.DT;
    };
    return [];
})

export default postsSlice