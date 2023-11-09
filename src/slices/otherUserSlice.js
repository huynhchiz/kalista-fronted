import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initOtherUser = {
    info: {
        id: '',
        email: '',
        username: '',
        phone: '',
        avatar: '',
    },
    followers: {
        countFollower: 0,
        listFollower: []
    },
    followings: {
        countFollowing: 0,
        listFollowing: []
    },
    posts: {
        posts: [],
        count: 0,
    }
}

const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState: initOtherUser,
    extraReducers: builder =>
    builder
        .addCase(fetchOtherUserInfo.fulfilled, (state, action) => {
            state.info = action.payload
        })
        .addCase(fetchOtherUserInfo.rejected, (state, action) => {
            state.info = initOtherUser.info
        })

        .addCase(fetchOtherUserFollowers.fulfilled, (state, action) => {
            state.followers = action.payload
        })
        .addCase(fetchOtherUserFollowers.rejected, (state, action) => {
            state.followers = initOtherUser.followers
        })
        
        .addCase(fetchOtherUserFollowings.fulfilled, (state, action) => {
            state.followings = action.payload
        })
        .addCase(fetchOtherUserFollowings.rejected, (state, action) => {
            state.followings = initOtherUser.followings
        })
        
        .addCase(fetchOtherUserPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        .addCase(fetchOtherUserPosts.rejected, (state, action) => {
            state.posts = initOtherUser.posts
        })
})

export const fetchOtherUserInfo = createAsyncThunk('otherUser/fetchOtherUserInfo', async ({ api, email }) => {
    let res = await api(email)
    if(res && +res.EC === 0) {
        return res.DT
    }
    return initOtherUser.info
})

export const fetchOtherUserFollowers = createAsyncThunk('otherUser/fetchOtherUserFollowers', async ({ api, email }) => {
    let res = await api(email)
    if(res && +res.EC === 0) {
        return res.DT
    }
    return initOtherUser.followings
})

export const fetchOtherUserFollowings = createAsyncThunk('otherUser/fetchOtherUserFollowings', async ({ api, email }) => {
    let res = await api(email)
    if(res && +res.EC === 0) {
        return res.DT
    }
    return initOtherUser.followers
})

export const fetchOtherUserPosts = createAsyncThunk('otherUser/fetchOtherUserPosts', async ({ api, email, limit }) => {
    let res = await api(email, limit)
    if (res && +res.EC === 0) {
        return res.DT;
    };
    return initOtherUser.posts;
})

export default otherUserSlice