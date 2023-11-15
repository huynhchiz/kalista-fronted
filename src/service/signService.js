import axios from '../setup/axios'

const registerUserService = (data) => {
    let email = data.email
    let phone = data.phone
    let username = data.username
    let password = data.password

    return axios.post('/account/register', {
       email, phone, username, password
    });
};

const loginUserService = (data) => {
    let loginValue = data.loginValue
    let password = data.password

    return axios.post('/account/login', {
        loginValue, password
    })
}

const logoutUserService = () => {
    return axios.post('/account/logout')
}

export {
    registerUserService, loginUserService, logoutUserService
}