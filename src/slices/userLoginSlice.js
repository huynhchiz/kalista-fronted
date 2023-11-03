import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initUserLogin = {
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    account: {
        userGroupWithRoles: '',
        email: '',
        username: '',
    },
}

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: { userLogin: initUserLogin, userAvatar: '' },
    reducers: {
        login: (state, action) => {
            state.userLogin = action.payload;
        },
        logoutUser: (state, action) => {
            state.userLogin = initUserLogin;
            state.userAvatar = ''
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getAccount.fulfilled, (state, action) => {
            state.userLogin = action.payload;
        })
        .addCase(getAccount.rejected, (state, action) => {
            state.userLogin = initUserLogin;
        })
        
        .addCase(refreshNewAccessToken.fulfilled, (state, action) => {
            state.userLogin = action.payload;
        })
        .addCase(refreshNewAccessToken.rejected, (state, action) => {
            state.userLogin = initUserLogin;
        })

        .addCase(getUserAvatar.fulfilled, (state, action) => {
            state.userAvatar = action.payload;
        })
        .addCase(getUserAvatar.rejected, (state, action) => {
            state.userAvatar = '';
        })
    }
})

export const getAccount = createAsyncThunk('userLogin/getAccount', async (getAccountService) => {
    let res = await getAccountService()
    if (res && +res.EC === 0) {
        console.log(res.EM);
        let data = {
            isAuthenticated: true,
            accessToken: res.DT.accessToken,
            refreshToken: res.DT.refreshToken,
            account: {
                userGroupWithRoles: res.DT.userGroupWithRoles,
                email: res.DT.email,
                username: res.DT.username,
            },
        }; 
        return data;
    }; 
    return initUserLogin;   
})

export const refreshNewAccessToken = createAsyncThunk('userLogin/refreshNewAccessToken', async (refreshTokenSV) => {
    let res = await refreshTokenSV()
    if (res && +res.EC === 0) {
        console.log(res.EM);
        let data = {
            isAuthenticated: true,
            accessToken: res.DT.accessToken,
            refreshToken: res.DT.refreshToken,
            account: {
                userGroupWithRoles: res.DT.userGroupWithRoles,
                email: res.DT.email,
                username: res.DT.username,
            },
        }
        return data;
    }
    return initUserLogin;
})

export const getUserAvatar = createAsyncThunk('userLogin/getUserAvatar', async (getAvtSV) => {
    let res = await getAvtSV()
    if(res && +res.EC === 0) {
        console.log(res.EM);
        return res.DT.avatar
    }

    return ''
})

export default userLoginSlice