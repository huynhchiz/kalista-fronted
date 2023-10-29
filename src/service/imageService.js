import axios from '../setup/axios'

const uploadImage = (data) => {
    return axios.post('/api/image/upload', data)
}

export {
    uploadImage
 }