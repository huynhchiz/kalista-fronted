import axios from '../setup/axios'

const createCommentSV = (data) => {
    return axios.post('/api/post/comment/create', { 
        postId: data.postId,
        comment: data.comment,
        date: data.date,
        time: data.time,
    })
}

const getOnePostCommentsSV = (postId, limit) => {
    return axios.post('/api/post/comment/get', { postId: postId, limit: limit })
}

const likeCommentSV = (commentId) => {
    return axios.post('/api/post/comment/like', { cmtId: commentId })
}

const unlikeCommentSV = (commentId) => {
    return axios.post('/api/post/comment/unlike', { cmtId: commentId })
}

const countCommentLikesSV = (commentId) => {
    return axios.post('/api/post/comment/count-like', { cmtId: commentId })
}

export {
    createCommentSV,
    getOnePostCommentsSV,
    likeCommentSV,
    unlikeCommentSV,
    countCommentLikesSV
}