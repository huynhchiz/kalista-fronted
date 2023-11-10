import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initPosts = {
    limit: 5,
    posts: [],
    count: 0
}

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        homePosts: initPosts,
        explorePosts: initPosts,
        userPosts: {
            limit: 15,
            posts: [],
            count: 0
        }
    },
    reducers: {
        addHomeLimit: (state, action) => {
            state.homePosts.limit = action.payload
        },
        addExploreLimit: (state, action) => {
            state.explorePosts.limit = action.payload
        },
        addUserPostsLimit: (state, action) => {
            state.userPosts.limit = action.payload
        },
    },
    extraReducers: builder =>
    builder
        .addCase(fetchHomePosts.fulfilled, (state, action) => {
            state.homePosts.posts = action.payload;
        })
        .addCase(fetchHomePosts.rejected, (state, action) => {
            state.homePosts.posts = [];
        })

        .addCase(fetchExplorePosts.fulfilled, (state, action) => {
            state.explorePosts.posts = action.payload;
        })
        .addCase(fetchExplorePosts.rejected, (state, action) => {
            state.explorePosts.posts = [];
        })

        .addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.userPosts.posts = action.payload.posts
            state.userPosts.count = action.payload.count
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
            state.userPosts.posts = []
            state.userPosts.count = 0
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