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

    return axios.post('/post/upload-post', {src, type, alt, caption, time, date})
}

const getHomePosts = (limit) => {
    return axios.get(`/post/get-home-posts/${limit}`)
}

const likePostSV = (postId) => {
    return axios.post('/post/like-post', { postId })
}

const unlikePostSV = (postId) => {
    return axios.post('/post/unlike-post', { postId })
}

const getInfoPostSV = (postId) => {
    return axios.get(`/post/get-post-info/${postId}`)
}

const getPostCommentsSV = (postId, limit) => {
    return axios.get(`/post/get-post-comments/${postId}/${limit}`)
}

/////
// const getNotFollowingPosts = (data) => {
//     return axios.post('/api/post/read-not-following', { limit: data })
// }

// const getUserPosts = (email, limit) => {
//     return axios.get('/api/post/read-user', { email, limit })
// }

// const likePostSV = (postId) => {
//     return axios.post('/api/post/like', { postId })
// }


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
    getHomePosts,
    likePostSV,
    getInfoPostSV,
    getPostCommentsSV,

    // getNotFollowingPosts,
    // getUserPosts,
    unlikePostSV,
    countOnePostLike,
    countOnePostComments,
    previewOnePost
}