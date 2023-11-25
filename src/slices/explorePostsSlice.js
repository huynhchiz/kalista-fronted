import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initPosts = {
    limit: 15,
    list: [],
}

const explorePostsSlice = createSlice({
    name: 'explorePosts',
    initialState: initPosts,
    reducers: {
        addLimit: (state, action) => {
            state.limit = action.payload
        },
        resetPosts: (state, action) => {
            state.limit = initPosts.limit
            state.list = initPosts.list
        } 
    },
    extraReducers: builder => {
        builder
        .addCase(fetchExplorePosts.fulfilled, (state, action) => {
            state.list = action.payload
        })
        .addCase(fetchExplorePosts.rejected, (state, action) => {
            state.list = initPosts.list
        })

        .addCase(fetchInfoPostExplore.fulfilled, (state, action) => {
            state.list = state.list.map(post => {
                if(post.id === action.payload.id) {return action.payload}
                return post
            })
        })
        .addCase(fetchInfoPostExplore.rejected, (state, action) => {
            state.list = initPosts.list
        })
    }
})

export const fetchExplorePosts = createAsyncThunk('homePosts/fetchExplorePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT
    };
    return [];
})

export const fetchInfoPostExplore = createAsyncThunk('post/fetchInfoPost', async ({ api, postId }) => {
    let res = await api(postId)
    if (res && +res.EC === 0) {
        return res.DT
    }
    return {}
})

export default explorePostsSlice