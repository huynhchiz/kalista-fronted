import axios from '../setup/axios'

const getAccountInfoSV = () =>  {
    return axios.get('/account/get-info')
}

const getAccountAvatarSV = () => {
    return axios.get('/account/get-avatar')
}

const refreshTokenSV = () =>  {
    return axios.post('/account/refresh-token')
}

const getAccountFollowersSV = (limit) =>  {
    return axios.get(`/account/get-followers/${limit}`)
}

const getAccountFollowingsSV = (limit) =>  {
    return axios.get(`/account/get-followings/${limit}`)
}

const deleteAvatar = () => {
    return axios.post('/account/delete-avatar')
}

const uploadAvatar = (data) => {
    return axios.post('/account/upload-avatar', { avatar: data })
}

const getAccountPosts = (limit) => {
    return axios.get(`/account/get-posts/${limit}`)
}

export {
    getAccountInfoSV,
    getAccountAvatarSV,
    refreshTokenSV,
    getAccountFollowersSV,
    getAccountFollowingsSV,
    deleteAvatar,
    uploadAvatar,
    getAccountPosts
}