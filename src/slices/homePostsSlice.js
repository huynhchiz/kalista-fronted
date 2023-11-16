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
    }
})

export const fetchHomePosts = createAsyncThunk('homePosts/fetchHomePosts', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT
    };
    return [];
})

export default homePostsSlice