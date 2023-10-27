import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccountService, refreshNewToken } from "../service/userService";
// import { loginUserService } from "../service/signService";

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
    initialState: { status: 'idle', userLogin: initUserLogin },
    reducers: {
        login: (state, action) => {
            state.userLogin = action.payload;
        },
        logoutUser: (state, action) => {
            state.userLogin = initUserLogin;
        },
        setCurrentApi: (state, action) => {
           state.currentApi = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAccount.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = 'idle';
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.currentUser = initUserLogin;
                state.status = 'idle';
            })
            .addCase(refreshNewAccessToken.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(refreshNewAccessToken.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = 'idle';
            })
            .addCase(refreshNewAccessToken.rejected, (state, action) => {
                state.currentUser = initUserLogin;
                state.status = 'idle';
            })
    }
})

// export const loginAccount = createAsyncThunk('userLogin/loginAccount', async (data) => {
//     let res = await loginUserService(data)
//     if(res && +res.EC === 0) {

//     }
// })

export const getAccount = createAsyncThunk('userLogin/getAccount', async () => {
    let res = await getAccountService()
    if (res && +res.EC === 0) {
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

export const refreshNewAccessToken = createAsyncThunk('userLogin/refreshNewAccessToken', async () => {
    let res = await refreshNewToken()
    if (res && +res.EC === 0) {
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

export default userLoginSlice