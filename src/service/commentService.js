import axios from '../setup/axios'

const createCommentSV = (data) => {
    return axios.post('/api/post/comment/create', { 
        postId: data.postId,
        comment: data.comment,
        date: data.date,
        time: data.time,
    })
}

export {
    createCommentSV
}