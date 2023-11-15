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
    }
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initAccount,
    reducers: {
        login: (state, action) => {
            state = action.payload;
            localStorage.setItem('checkLogin', JSON.stringify(true))
        },
        logout: (state, action) => {
            state = initAccount
            localStorage.setItem('checkLogin', JSON.stringify(false))
        },
    },
    extraReducers: builder => {
        builder

        .addCase(fetchAccountInfo.fulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.info = action.payload.info;
        })
        .addCase(fetchAccountInfo.rejected, (state, action) => {
            state.auth = initAccount.auth;
            state.info = initAccount.info;
        })

        .addCase(refreshToken.fulfilled, (state, action) => {
            state.auth = action.payload.auth;
            state.info = action.payload.info;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.auth = initAccount.auth;
            state.info = initAccount.info;
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
            userId: res.DT.userId,
            userGroupWithRoles: res.DT.userGroupWithRoles,
            email: res.DT.email,
            username: res.DT.username,
            avatar: res.DT.avatar
        }

        return {
            auth: auth,
            info: info,
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
            userId: res.DT.id,
            userGroupWithRoles: res.DT.userGroupWithRoles,
            email: res.DT.email,
            username: res.DT.username,
            avatar: res.DT.avatar
        }

        return {
            auth: auth,
            info: info,
        }
    }

    return {}
})

export const fetchAccountFollowers = createAsyncThunk('account/fetchAccountFollowers', async (api) => {
    let res = await api()
    if(res && +res.EC === 0) {
        let followers = {
            count: res.DT.countFollower,
            list: res.DT.listFollower,
        }
        return followers
    }
    return {}
})

export const fetchAccountFollowings = createAsyncThunk('account/fetchAccountFollowings', async (api) => {
    let res = await api()
    if(res && +res.EC === 0) {
        let followings = {
            count: res.DT.countFollowing,
            list: res.DT.listFollowing,
        }
        return followings
    }
    return {}
})

export default accountSlice