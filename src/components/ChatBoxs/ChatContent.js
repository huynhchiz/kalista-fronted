import { useSelector } from 'react-redux';
import './ChatContent.scss'
import ChatMessageItem from './ChatMessageItem'
import { accInfoSelector } from '../../redux/selectors/accountSelector';
import unsetAvatar from '../../assets/images/user-avatar-unset.png'
import { useEffect, useState } from 'react';
import { createMessage, getChatbox } from '../../service/messageService';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dispatchGetListChatbox } from '../../dispatchs/dispatchAccount';

const ChatContent = ({ hideList, darkTheme, chatboxId, avatarUser, userId, username, socketRef }) => {
    const accountInfo = useSelector(accInfoSelector)
    const accountId = accountInfo.userId

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')

    const [message, setMessage] = useState('')
    const [listMessage, setListMessage] = useState([])
    const [limitMess, setLimitMess] = useState(15)
    const navigate = useNavigate()

    const fetchChatbox = async () =>  {
        let res = await getChatbox(+userIdParam, +chatboxId, +limitMess)
        if (res && +res.EC === 0) {
            setListMessage(res.DT.chatboxMessage)
        }
    }

    const handleAddLimitMess = () => {
        setLimitMess(limitMess + 15)
    }
    
    useEffect(() => {
        if(userIdParam) {
            fetchChatbox()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userIdParam, limitMess])

    useEffect(() => {
        if(socketRef?.current) {
            socketRef.current.on(`sendMessageFromChatbox${chatboxId}`, dataGot => {
                fetchChatbox()
            })
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // khuc nay dang ko hieu
        socketRef.current.on(`checkOnline${userIdParam}`, (data) => {
            console.log('check online ', data);
        })

        socketRef.current.on(`checkOffline${userIdParam}`, (data) => {
            console.log('check offline ', data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userIdParam, socketRef])

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

                socketRef.current.emit(`sendMessage`, chatboxId)
            }
        }
    }

    const handleNavigateToProfile = () => {
        navigate(`/profile?user=${userIdParam}`)
    }
    
    return (
        <div className={`chat-content${hideList ? ' chat-content-full' : ' chat-content-hide'}${darkTheme ? ' chat-content-dark' : ''}`}>
            <div className='chat-content-header'>
                <div className='chat-content-header-info' onClick={handleNavigateToProfile}>
                    <img src={avatarUser ? avatarUser : unsetAvatar} alt='_avatar-chat' />
                    <p className='chat-content-header-username'>{username ? username : ''}</p>
                </div>
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
                <div className='add-message-btn' onClick={handleAddLimitMess}>
                    <p>Load more message</p>
                </div>
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