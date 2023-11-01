import axios from '../setup/axios.js'

const uploadImageCloudinary = (data) => {
    return axios.post('/api/image/upload-cloudinary', data)
}

const uploadImageService = (data) => {
    let src = data.src
    let alt = data.alt
    let caption = data.caption
    let time = data.time
    let date = data.date

    return axios.post('api/image/upload', {src, alt, caption, time, date})
}

export {
    uploadImageCloudinary, uploadImageService
 }