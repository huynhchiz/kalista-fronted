import { useSelector } from 'react-redux';
import './ChatContent.scss'
import ChatMessageItem from './ChatMessageItem'
import { accInfoSelector } from '../../redux/selectors/accountSelector';
import unsetAvatar from '../../assets/images/user-avatar-unset.png'
import { useEffect, useState } from 'react';
import { createMessage, getChatbox } from '../../service/messageService';
import { useSearchParams } from 'react-router-dom'
import { dispatchGetListChatbox } from '../../dispatchs/dispatchAccount';

const ChatContent = ({ hideList, darkTheme, chatboxId, avatarUser }) => {
    const accountInfo = useSelector(accInfoSelector)
    const accountId = accountInfo.userId

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')

    const [message, setMessage] = useState('')
    const [listMessage, setListMessage] = useState([])

    const fetchChatbox = async () =>  {
        let res = await getChatbox(+userIdParam, +chatboxId, 15)
        if (res && +res.EC === 0) {
            setListMessage(res.DT)
        }
    }
    
    useEffect(() => {
        if(userIdParam) {
            fetchChatbox()
        }
    }, [userIdParam])

    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
    }
    
    const buildDataToCreateMessage = () => {
        let data = {}
        data = {
            type: 'text',
            chatboxId: chatboxId,
            message: message,
            src: '',
            date: (new Date().toLocaleTimeString()).toString(),
            time: (new Date().toLocaleDateString()).toString(),
        }
        return data
    }

    const handleCreateMessage = async () => {
        if(message !== '') {
            let data = buildDataToCreateMessage()
            let res = await createMessage(data)
            if(res && +res.EC === 0) {
                fetchChatbox()
                dispatchGetListChatbox(20)
                setMessage('')
            }
        }
    }
    
    return (
        <div className={`chat-content${hideList ? ' chat-content-full' : ' chat-content-hide'}${darkTheme ? ' chat-content-dark' : ''}`}>
            <div className='chat-content-header'>
                <img src={avatarUser ? avatarUser : unsetAvatar} alt='_avatar-chat' />
                <p className='chat-content-header-username'>{}</p>
            </div>

            <div className='chat-content-main'>
                {
                    listMessage?.length > 0 &&
                    listMessage.map(item => (
                        <ChatMessageItem
                            isAccountMessage={+accountId === +item.userId}
                            key={'key_' + item.id}
                            message={item.message} 
                            dateTime={item.time}
                        />
                    ))
                }
            </div>

            <div className='chat-content-footer'>
                <input
                    type='text'
                    value={message}
                    onChange={handleChangeMessage}    
                />
                <div className='send-message-btn' onClick={handleCreateMessage}>SEND</div>
            </div>
        </div>
    )
}

export default ChatContent