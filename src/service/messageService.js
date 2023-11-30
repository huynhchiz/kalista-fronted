import axios from '../setup/axios'

const getChatbox = (userId, limit) => {
    console.log(userId);
    console.log(limit);
    return axios.get(`/message/get-chatbox/${userId}/${limit}`)
}

export {
    getChatbox,

}