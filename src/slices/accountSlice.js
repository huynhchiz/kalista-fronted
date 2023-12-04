import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initAccount = {
    auth: {
        isAuth: false,
        accessToken: '',
        refreshToken: '',
    },
    info: {
        userId: '',
        userGroupWithRoles: '',
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
    listChatbox: [],
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initAccount,
    reducers: {
        login: (state, action) => {
            state.auth = action.payload.auth;
            localStorage.setItem('checkLogin', JSON.stringify(true))
        },
        logout: (state, action) => {
            state.auth = initAccount.auth
            state.info = initAccount.info
            state.followers = initAccount.followers
            state.followings = initAccount.followings
            state.posts = initAccount.posts
            localStorage.setItem('checkLogin', JSON.stringify(false))
        },
    },
    extraReducers: builder => {
        builder

        .addCase(fetchAccountInfo.fulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.info = action.payload.info;
            state.followings.count = action.payload.countFollowing
            state.followers.count = action.payload.countFollower
            state.posts.count = action.payload.countPost
        })
        .addCase(fetchAccountInfo.rejected, (state, action) => {
            state.auth = initAccount.auth;
            state.info = initAccount.info;
            state.followings.count = initAccount.followings.count
            state.followers.count = initAccount.followers.count
            state.posts.count = initAccount.posts.count
        })

        .addCase(refreshToken.fulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.info = action.payload.info;
            state.followings.count = action.payload.countFollowing
            state.followers.count = action.payload.countFollower
            state.posts.count = action.payload.countPost
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.auth = initAccount.auth;
            state.info = initAccount.info;
            state.followings.count = initAccount.followings.count
            state.followers.count = initAccount.followers.count
            state.posts.count = initAccount.posts.count
        })
        
        .addCase(fetchAccountFollowers.fulfilled, (state, action) => {
            state.followers = action.payload;
        })
        .addCase(fetchAccountFollowers.rejected, (state, action) => {
            state.followers = initAccount.followers;
        })

        .addCase(fetchAccountFollowings.fulfilled, (state, action) => {
            state.followings = action.payload;
        })
        .addCase(fetchAccountFollowings.rejected, (state, action) => {
            state.followings = initAccount.followings;
        })

        .addCase(fetchAccountAvatar.fulfilled, (state, action) => {
            state.info.avatar = action.payload;
        })
        .addCase(fetchAccountAvatar.rejected, (state, action) => {
            state.info.avatar = initAccount.info.avatar;
        })
        
        .addCase(fetchAccountPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        .addCase(fetchAccountPosts.rejected, (state, action) => {
            state.posts = initAccount.posts;
        })
        
        .addCase(fetchInfoPostAccount.fulfilled, (state, action) => {
            state.posts.list = state.posts.list.map(post => {
                if(post.id === action.payload.id) {return action.payload}
                return post
            })
        })
        .addCase(fetchInfoPostAccount.rejected, (state, action) => {
            state.posts.list = initAccount.posts.list;
        })

        
        .addCase(fetchListChatbox.fulfilled, (state, action) => {
            state.listChatbox = action.payload
        })
        .addCase(fetchListChatbox.rejected, (state, action) => {
            state.listChatbox = initAccount.listChatbox;
        })
    }
})

export const fetchAccountInfo = createAsyncThunk('account/fetchAccount', async (api) => {
    let res = await api()
    if(res && +res.EC === 0) {
        let auth = {
            isAuth: true,
            accessToken: res.DT.accessToken,
            refreshToken:res.DT.refreshToken,
        }
        let info = {
            userId: res.DT.id || res.DT.userId,
            userGroupWithRoles: res.DT.userGroupWithRoles,
            email: res.DT.email,
            username: res.DT.username,
            avatar: res.DT.avatar
        }
        let countFollowing = res.DT.countFollowing
        let countFollower = res.DT.countFollower
        let countPost = res.DT.countPost

        return {
            auth: auth,
            info: info,
            countFollowing: countFollowing,
            countFollower: countFollower,
            countPost: countPost
        }
    }

    return {}
})

export const refreshToken = createAsyncThunk('account/refreshToken', async (api) => {
    let res = await api()
    if(res && +res.EC === 0) {
        let auth = {
            isAuth: true,
            accessToken: res.DT.accessToken,
            refreshToken:res.DT.refreshToken,
        }
        let info = {
            userId: res.DT.id || res.DT.userId,
            userGroupWithRoles: res.DT.userGroupWithRoles,
            email: res.DT.email,
            username: res.DT.username,
            avatar: res.DT.avatar
        }
        let countFollowing = res.DT.countFollowing
        let countFollower = res.DT.countFollower
        let countPost = res.DT.countPost

        return {
            auth: auth,
            info: info,
            countFollowing: countFollowing,
            countFollower: countFollower,
            countPost: countPost
        }
    }

    return {}
})

export const fetchAccountFollowers = createAsyncThunk('account/fetchAccountFollowers', async ({ api, limit }) => {
    let res = await api(limit)
    if(res && +res.EC === 0) {
        let followers = {
            count: res.DT.countFollower,
            list: res.DT.listFollower,
        }
        return followers
    }
    return {}
})

export const fetchAccountFollowings = createAsyncThunk('account/fetchAccountFollowings', async ({ api, limit }) => {
    let res = await api(limit)
    if(res && +res.EC === 0) {
        let followings = {
            count: res.DT.countFollowing,
            list: res.DT.listFollowing,
        }
        return followings
    }
    return {}
})

export const fetchAccountAvatar = createAsyncThunk('account/fetchAccountAvatar', async ({api}) => {
    let res = await api()
    if(res && +res.EC === 0) {
        return res.DT.avatar
    }
    return ''
})

export const fetchAccountPosts = createAsyncThunk('account/fetchAccountPosts', async ({ api, limit }) => {
    let res = await api(limit)
    if(res && +res.EC === 0) {
        let posts = {
            list: res.DT.list,
            count: res.DT.count,
        }
        return posts
    }
    return {}
})

export const fetchInfoPostAccount = createAsyncThunk('account/fetchInfoPostAccount', async ({ api, postId }) => {
    let res = await api(postId)
    if (res && +res.EC === 0) {
        return res.DT
    }
    return {}
})

export const fetchListChatbox = createAsyncThunk('account/fetchListChatbox', async ({ api, limit }) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return res.DT
    }
    return []
})

export default accountSlice