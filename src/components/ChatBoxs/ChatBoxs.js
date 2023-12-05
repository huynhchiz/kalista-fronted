import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatBoxs.scss'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import ChatListItem from './ChatListItem'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import ChatContent from './ChatContent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { listChatboxSelector } from '../../redux/selectors/accountSelector'
import { dispatchGetListChatbox } from '../../dispatchs/dispatchAccount'

import socketIOClient from 'socket.io-client'

const ChatBoxs = () => {
    const darkTheme = useSelector(themeSelector)
    const listChatbox = useSelector(listChatboxSelector)

    const [limitList, setLimitList] = useState(20)    
    const [hideList, setHideList] = useState(false)
    const [avatarUser, setAvatarUser] = useState()
    const [username, setUsername] = useState('')
    const [currentChatboxId, setCurrentChatboxId] = useState()

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')

    const navigate = useNavigate()
    
    const socketRef = useRef();
    
    useEffect(() => {
        socketRef.current = socketIOClient.connect('http://localhost:3434')

        socketRef.current.on('getId', data => {
            console.log({data});
        })

        // mỗi khi có tin nhắn thì mess sẽ được render thêm 
        socketRef.current.on('sendDataServer', dataGot => {
            dispatchGetListChatbox(limitList)
        })
        
        return () => {
            socketRef.current.disconnect();
        };

    }, []);

    const handleToggleChatList = () => {
        setHideList(!hideList)
    }

    useEffect(() => {
        dispatchGetListChatbox(limitList)
    }, [])

    const navigateToChatbox = (userId, username, userAvatar, chatboxId) => {
        navigate(`/chat-boxs?user=${userId}`)
        setUsername(username)
        setAvatarUser(userAvatar)
        setCurrentChatboxId(chatboxId)
        if(window.innerWidth < 850) {
            setHideList(true)
        }
    }

    return (
        <div className={`chat-boxs${darkTheme ? ' chat-boxs-dark' : ''}`}>

            <FontAwesomeIcon icon={faBars} className='chat-list-toggle-icon' onClick={handleToggleChatList} />
        
            <div className={`chat-list${hideList ? ' chat-list-hide' : ' chat-list-full'}`}>

                <div className='chat-list-header'>
                    <div className='chat-list-search'>

                        <input type='text' />
                        <div className='chat-list-search-btn'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>

                    </div>
                </div>

                <div className='chat-list-main'>
                {
                    listChatbox?.length > 0 && 
                    listChatbox.map(item => (
                        <ChatListItem
                            key={'key' + item.id}
                            onActive={() => navigateToChatbox(
                                item.otherUser.id,
                                item.otherUser.username,
                                item.otherUser.avatar, 
                                item.id
                            )}
                            avatar={item.otherUser.avatar}
                            username={item.otherUser.username}
                            lastMessage={item.lastMessage}
                        />
                    ))
                }
                </div>


            </div>

            {
                userIdParam && 
                <ChatContent 
                    hideList={hideList}
                    darkTheme={darkTheme}
                    chatboxId={currentChatboxId}
                    avatarUser={avatarUser}
                    username={username}
                    socketRef={socketRef}
                 />
            }

        </div>
    )
}

export default ChatBoxs