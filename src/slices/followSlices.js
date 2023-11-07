import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initFollow = { count: 0, list: [] }

const followSlice = createSlice({
    name: 'follow',
    initialState: {
        followers: initFollow,
        followings: initFollow,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserFollowing.fulfilled, (state, action) => {
                state.followings = action.payload;
            })
            .addCase(fetchUserFollowing.rejected, (state, action) => {
                state.followings = initFollow;
            })
            .addCase(fetchUserFollower.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(fetchUserFollower.rejected, (state, action) => {
                state.followers = initFollow;
            })
    }
})

export const fetchUserFollowing = createAsyncThunk('follow/fetchUserFollowing', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return {
            count: res.DT.countFollowing,
            list: res.DT.listFollowing
        }
    };
    return initFollow;
})

export const fetchUserFollower = createAsyncThunk('follow/fetchUserFollower', async ({api, limit}) => {
    let res = await api(limit)
    if (res && +res.EC === 0) {
        return {
            count: res.DT.countFollower,
            list: res.DT.listFollower
        }
    };
    return initFollow;
})

export default followSlice