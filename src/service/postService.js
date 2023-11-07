import axios from '../setup/axios'

const uploadImage = (data) => {
    return axios.post('/api/post/upload-cloudinary-image', data)
}

const uploadVideo = (data) => {
    return axios.post('/api/post/upload-cloudinary-video', data)
}

const uploadPost = (data) => {
    let src = data.src
    let type = data.type
    let alt = data.alt
    let caption = data.caption
    let time = data.time
    let date = data.date

    return axios.post('api/post/upload', {src, type, alt, caption, time, date})
}

const getPosts = (data) => {
    return axios.post('/api/post/read', { limit: data })
}

const getFollowingPosts = (data) => {
    return axios.post('/api/post/read-following', { limit: data })
}

const getNotFollowingPosts = (data) => {
    return axios.post('/api/post/read-not-following', { limit: data })
}

const getUserPosts = (email, limit) => {
    return axios.post('/api/post/read-user', { email, limit })
}

const likePostSV = (postId) => {
    return axios.post('/api/post/like', { postId })
}

const unlikePostSV = (postId) => {
    return axios.post('/api/post/unlike', { postId })
}

export {
    uploadImage,
    uploadVideo,
    uploadPost,
    getPosts,
    getFollowingPosts,
    getNotFollowingPosts,
    getUserPosts,
    likePostSV,
    unlikePostSV
}