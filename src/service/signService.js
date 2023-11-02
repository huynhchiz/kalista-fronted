import axios from '../../src/setup/axios.js'

const registerUserService = (data) => {
    let email = data.email
    let phone = data.phone
    let username = data.username
    let password = data.password

    return axios.post('/api/register', {
       email, phone, username, password
    });
};

const loginUserService = (data) => {
    let loginValue = data.loginValue
    let password = data.password

    return axios.post('/api/login', {
        loginValue, password
    })
}

const logoutUserService = () => {
    return axios.post('/api/logout')
}

export {
    registerUserService, loginUserService, logoutUserService
}