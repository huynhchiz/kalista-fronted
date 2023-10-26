import axios from '../setup/axios.js'

const registerUser = (data) => {
    let email = data.email
    let phone = data.phone
    let username = data.username
    let password = data.password

    return axios.post('/api/register', {
       email,
       phone,
       username,
       password,
    });
};

export {
    registerUser,
}