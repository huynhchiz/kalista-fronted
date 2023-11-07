import axios from '../setup/axios'

const followSV = (email) => {
    return axios.post('/api/user/follow', { email: email })
}

const unfollowSV = (email) => {
    return axios.post('/api/user/unfollow', { email: email })
}

const getUsersFollowingSV = (email, limit) => {
    return axios.post('/api/user/following/read', { email, limit })
}

const getFollowersSV = (email, limit) => {
    return axios.post('/api/user/follower/read', { email, limit })
}

export {
    followSV,
    unfollowSV,
    getUsersFollowingSV,
    getFollowersSV
}