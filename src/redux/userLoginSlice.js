import { createSlice } from "@reduxjs/toolkit";

const initUserLogin = {
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    account: {
        usertypeWithRoles: '',
        email: '',
        username: '',
    },
}

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: { status: 'idle', userLogin: initUserLogin },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logoutUser: (state, action) => {
            state.currentUser = initUserLogin;
   
            // localStorage.removeItem('jwt');
            // localStorage.removeItem('refreshToken');
        },
        setCurrentApi: (state, action) => {
           state.currentApi = action.payload;
        },
    }
})

export default userLoginSlice