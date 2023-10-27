import axios from "../setup/axios";

const getAccountService = () => {
    return axios.get('/api/account')
}

const refreshNewToken = () => {
    return axios.post('/api/refresh-token')
}

export { getAccountService, refreshNewToken }