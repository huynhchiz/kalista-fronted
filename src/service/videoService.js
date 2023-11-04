import axios from '../setup/axios'

const uploadVideoCloudinary = (data) => {
    return axios.post('/api/video/upload-cloudinary', data)
}

const uploadVideoService = (data) => {
    let src = data.src
    let alt = data.alt
    let caption = data.caption
    let time = data.time
    let date = data.date

    return axios.post('api/video/upload', { src, alt, caption, time, date })
}

export {
    uploadVideoCloudinary, uploadVideoService
}