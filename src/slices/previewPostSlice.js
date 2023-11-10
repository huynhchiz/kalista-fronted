import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initPreviewPost = {
    postId: null,
    src: '',
    type: 'image',
    alt: '',
    caption: '', 
    date: '',
    username: '', 
    email: '',
    avatar: '',
    countLike: 0,
    countComment: 0,
    liked: false
}

const previewPostSlice = createSlice({
    name: 'previewPost',
    initialState: { post: initPreviewPost },
    extraReducers: builder => {
    builder
        .addCase(fetchOnePreviewPost.fulfilled, (state, action) => {
            state.post = action.payload
        })
        .addCase(fetchOnePreviewPost.rejected, (state, action) => {
            state.post = initPreviewPost
        })
    }
})

export const fetchOnePreviewPost = createAsyncThunk('previewPost/fetchOnePreviewPost', async ({ api, postId }) => {
    let res = await api(postId)
    if (res && +res.EC === 0) {
        let data = {
            postId: res.DT.id,
            src: res.DT.src,
            type: res.DT.type,
            alt: res.DT.alt,
            caption: res.DT.caption, 
            date: res.DT.date,
            username: res.DT.User.username, 
            email: res.DT.User.email,
            avatar: res.DT.User.avatar,
            countLike: res.DT.postLikeCount,
            countComment: res.DT.postCommentCount,
            liked: res.DT.liked  
        }
        return data
    }
    return initPreviewPost
})

export default previewPostSlice