import axios from '../setup/axios'

const followSV = (email) => {
    return axios.post('/api/user/follow', { email: email })
}

const unfollowSV = (email) => {
    return axios.post('/api/user/unfollow', { email: email })
}

export {
    followSV,
    unfollowSV
}