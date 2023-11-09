import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        homePosts: [],
        explorePosts: [],
        userPosts: { count: 0, posts: [] }
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
            state.userPosts = { count: 0, posts: [] };
        })
})

export const fetchHomePosts = createAsyncThunk('posts/fetchHomePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT;
    };
    return [];
})

export const fetchExplorePosts = createAsyncThunk('posts/fetchExplorePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT;
    };
    return [];
})

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async ({api, email, limit}) => {
    let res = await api( email, limit)
    if (res && +res.EC === 0) {
        let data = {
            count: res.DT.count,
            posts: res.DT.posts
        }
        return data;
    };
    return { count: 0, posts: [] };
})

export default postsSlice