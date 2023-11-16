import axios from "../setup/axios.js";

const getUserInfo = (userId) => {
    return axios.get(`/user/get-user-info/${userId}`)
}

const getUserPosts = (userId, limit) => {
    return axios.get(`/user/get-user-posts/${userId}/${limit}`)
}


///////
const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

// const uploadAvatar = (data) => {
//     return axios.post('/api/user/avatar/upload', { avatar: data })
// }

const getUserAvatar = () => {
    return axios.get('/api/user/avatar/read')
}

const deleteUserAvatar = () => {
    return axios.post('/api/user/avatar/delete')
}

const getOtherUserInfoSV = (email) => {
    return axios.post('/api/user/other/read-info', { email: email })
}

export {
    getAccountService,
    refreshNewToken,
    // uploadAvatar,
    getUserAvatar,
    deleteUserAvatar,
    getOtherUserInfoSV,


    getUserInfo,
    getUserPosts
}