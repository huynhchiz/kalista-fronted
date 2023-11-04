import axios from '../setup/axios'

const getAllPosts = () => {
    return axios.get('/api/post/read')
}

export {
    getAllPosts
}