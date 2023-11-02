import axios from "../setup/axios.js";

const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

const uploadAvatar = (data) => {
    let avatar = data.avatar
    let email = data.email
    return axios.post('/api/user/avatar/upload', { avatar, email })
}

export { getAccountService, refreshNewToken, uploadAvatar }