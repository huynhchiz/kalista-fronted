import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initCommentsPost = {
    list: [],
    count: 0,
}

const commentSlice = createSlice({
    name: 'comments',
    initialState: initCommentsPost,
    reducers: {
        resetComments: (state, action) =>  {
            state.list = initCommentsPost.list
            state.count = initCommentsPost.count
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchPostComments.fulfilled, (state, action) => {
            state.list = action.payload
            state.count = action.payload.length || 0
        })
        .addCase(fetchPostComments.rejected, (state, action) => {
            state.list = initCommentsPost.list
            state.count = initCommentsPost.count
        })

        .addCase(fetchInfoComment.fulfilled, (state, action) => {
            state.list = state.list.map(comment => {
                if(comment.id === action.payload.id) {return action.payload}
                return comment
            })
        })
        .addCase(fetchInfoComment.rejected, (state, action) => {
            state.list = initCommentsPost.list
        })
    }
})

export const fetchPostComments = createAsyncThunk('comments/fetchPostComments', async ({ api, postId, limit }) => {
    let res = await api(postId, limit)
    if(res && +res.EC === 0) {
        return res.DT
    }
    return []
})

export const fetchInfoComment = createAsyncThunk('comments/fetchInfoComment', async ({ api, commentId }) => {
    let res = await api(commentId)
    if(res && +res.EC === 0) {
        return res.DT
    }
    return {}
})


export default commentSlice