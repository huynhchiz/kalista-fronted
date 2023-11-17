import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initPosts = {
    limit: 5,
    list: [],
}

const homePostsSlice = createSlice({
    name: 'homePosts',
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
        .addCase(fetchHomePosts.fulfilled, (state, action) => {
            state.list = action.payload
        })
        .addCase(fetchHomePosts.rejected, (state, action) => {
            state.list = initPosts.list
        })

        .addCase(fetchInfoPostHome.fulfilled, (state, action) => {
            state.list = state.list.map(post => {
                if(post.id === action.payload.id) {return action.payload}
                return post
            })
        })
        .addCase(fetchInfoPostHome.rejected, (state, action) => {
            state.list = initPosts.list
        })
    }
})

export const fetchHomePosts = createAsyncThunk('homePosts/fetchHomePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT
    };
    return [];
})

export const fetchInfoPostHome = createAsyncThunk('post/fetchInfoPost', async ({ api, postId }) => {
    let res = await api(postId)
    if (res && +res.EC === 0) {
        return res.DT
    }
    return
})

export default homePostsSlice