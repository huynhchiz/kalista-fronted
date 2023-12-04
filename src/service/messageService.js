import axios from '../setup/axios'

const getListChatbox = (limit) => {
    return axios.get(`/message/get-list-chatbox/${limit}`)
}

const getChatbox = (userId, chatboxId, limit) => {
    return axios.get(`/message/get-chatbox/${userId}/${chatboxId}/${limit}`)
}

const createMessage = (data) => {
    const type = data.type
    const chatboxId = data.chatboxId
    const message = data.message
    const src = data.src
    const date = data.date
    const time = data.time

    return axios.post(`message/create-message`, { 
        type, message, src, chatboxId, date, time
    })
}

export {
    getListChatbox,
    getChatbox,
    createMessage,

}