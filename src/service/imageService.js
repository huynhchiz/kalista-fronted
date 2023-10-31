import axios from '../setup/axios.js'

const uploadImage = (data) => {
    return axios.post('/api/image/upload', data)
}

export {
    uploadImage
 }