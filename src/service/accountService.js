import axios from '../setup/axios'

const getAccountInfoSV = () =>  {
    return axios.get('/account/get-info')
}

const refreshTokenSV = () =>  {
    return axios.post('/account/refresh-token')
}

const getAccountFollowersSV = () =>  {
    return axios.get('/account/get-followers')
}

const getAccountFollowingsSV = () =>  {
    return axios.get('/account/get-followings')
}
export {
    getAccountInfoSV,
    refreshTokenSV,
    getAccountFollowersSV,
    getAccountFollowingsSV
}