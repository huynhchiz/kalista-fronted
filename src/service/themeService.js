import axios from '../setup/axios'
import store from '../redux/store'

const state = store.getState()

const getThemeService = (data) => {
    let email = data.userEmail

    return axios.get('/api/theme/read', {
        email
    })
}

export {
    getThemeService
}