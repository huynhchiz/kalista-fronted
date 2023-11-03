import axios from "../setup/axios.js";

const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

const uploadAvatar = (data) => {
    return axios.post('/api/user/avatar/upload', { avatar: data })
}

const getUserAvatar = () => {
    return axios.get('/api/user/avatar/read')
}

const deleteUserAvatar = () => {
    return axios.post('/api/user/avatar/delete')
}

export {
    getAccountService, refreshNewToken, uploadAvatar, getUserAvatar, deleteUserAvatar
}