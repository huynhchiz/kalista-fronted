import axios from '../setup/axios.js'

const uploadImageCloudinary = (data) => {
    return axios.post('/api/image/upload-cloudinary', data)
}

const uploadImage = (data) => {
    let src = data.src
    let alt = data.alt
    let caption = data.caption
    let time = data.time

    return axios.post('api/image/upload', {src, alt, caption, time})
}

export {
    uploadImageCloudinary, uploadImage
 }