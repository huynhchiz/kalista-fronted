import axios from '../setup/axios'

import store from '../redux/store'
let state = store.getState()

console.log(state);

const getThemeService = (data) => {
    let email = data.userEmail

    return axios.get('/api/theme/read', {
        email
    })
}

export {
    getThemeService
}