import axios from "../setup/axios.js";

const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

const uploadAvatar = (data) => {
    let email = data.email
    let avatar = data.avatar
    return axios.post('/api/user/avatar/upload', { email, avatar })
}

const getUserAvatar = (data) => {
    return axios.post('/api/user/avatar/read', {email: data})
}

export { getAccountService, refreshNewToken, uploadAvatar, getUserAvatar }