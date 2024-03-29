import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initUser = {
    info: {
        userId: '',
        email: '',
        username: '',
        avatar: ''
    },
    followings: {
        count: 0,
        list: []
    },
    followers:{
        count: 0,
        list: []
    },
    posts: {
        count: 0,
        list: []
    },
    isFollowing: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initUser,
    extraReducers: builder => {
        builder
        .addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.info = action.payload.info;
            state.followings.count = action.payload.countFollowing
            state.followers.count = action.payload.countFollower
            state.posts.count = action.payload.countPost
            state.isFollowing = action.payload.isFollowing
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
            state.info = initUser.info;
            state.followings.count = initUser.followings.count
            state.followers.count = initUser.followers.count
            state.posts.count = initUser.posts.count
            state.isFollowing = initUser.isFollowing
        })

        .addCase(fetchUserPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
            state.posts = initUser.posts
        })
        
        .addCase(fetchUserFollowers.fulfilled, (state, action) => {
            state.followers = action.payload;
        })
        .addCase(fetchUserFollowers.rejected, (state, action) => {
            state.followers = initUser.followers;
        })

        .addCase(fetchUserFollowings.fulfilled, (state, action) => {
            state.followings = action.payload;
        })
        .addCase(fetchUserFollowings.rejected, (state, action) => {
            state.followings = initUser.followings;
        })

    }
})

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async ({ api, userId }) => {
    let res = await api(userId)
    if(res && +res.EC === 0) {
        let info = {
            userId: res.DT.id,
            email: res.DT.email,
            username: res.DT.username,
            avatar: res.DT.avatar
        }
        let countFollower = res.DT.countFollower
        let countFollowing = res.DT.countFollowing
        let countPost = res.DT.countPost
        let isFollowing = res.DT.isFollowing
        return {
            info, countFollower, countFollowing, countPost, isFollowing
        }
    } 

    return {}
})

export const fetchUserPosts = createAsyncThunk('user/fetchUserPosts', async ({ api, userId, limit }) => {
    let res = await api(userId, limit)
    if(res && +res.EC === 0) {
        return res.DT
    } 

    return {}
})

export const fetchUserFollowers = createAsyncThunk('user/fetchUserFollowers', async ({ api, userId, limit }) => {
    let res = await api(userId, limit)
    if(res && +res.EC === 0) {
        let followers = {
            count: res.DT.countFollower,
            list: res.DT.listFollower,
        }
        return followers
    }
    return {}
})

export const fetchUserFollowings = createAsyncThunk('user/fetchUserFollowings', async ({ api, userId, limit }) => {
    let res = await api(userId, limit)
    if(res && +res.EC === 0) {
        let followings = {
            count: res.DT.countFollowing,
            list: res.DT.listFollowing,
        }
        return followings
    }
    return {}
})

export default userSlice