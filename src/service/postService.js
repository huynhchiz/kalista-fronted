import axios from '../setup/axios'

const uploadImage = (data) => {
    return axios.post('/post/upload-cloudinary-image', data)
}

const uploadVideo = (data) => {
    return axios.post('/post/upload-cloudinary-video', data)
}

const uploadPost = (data) => {
    let src = data.src
    let type = data.type
    let alt = data.alt
    let caption = data.caption
    let time = data.time
    let date = data.date

    return axios.post('/post/upload', {src, type, alt, caption, time, date})
}

// const getPosts = (data) => {
//     return axios.post('/api/post/read', { limit: data })
// }

const getHomePosts = (limit) => {
    return axios.get(`/post/get-home/${limit}`)
}

const getNotFollowingPosts = (data) => {
    return axios.post('/api/post/read-not-following', { limit: data })
}

const getUserPosts = (email, limit) => {
    return axios.get('/api/post/read-user', { email, limit })
}

const likePostSV = (postId) => {
    return axios.post('/api/post/like', { postId })
}

const unlikePostSV = (postId) => {
    return axios.post('/api/post/unlike', { postId })
}

const countOnePostLike = (postId) => {
    return axios.post('/api/post/count-like', { postId })
}

const countOnePostComments = (postId) => {
    return axios.post('/api/post/count-comment', { postId })
}

const previewOnePost = (postId) => {
    return axios.get(`/api/post/preview/${postId}`)
}

export {
    uploadImage,
    uploadVideo,
    uploadPost,
    // getPosts,
    getHomePosts,

    getNotFollowingPosts,
    getUserPosts,
    likePostSV,
    unlikePostSV,
    countOnePostLike,
    countOnePostComments,
    previewOnePost
}