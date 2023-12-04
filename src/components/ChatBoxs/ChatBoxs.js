import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatBoxs.scss'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import ChatContent from './ChatContent'
import { useNavigate } from 'react-router-dom'
import { listChatboxSelector } from '../../redux/selectors/accountSelector'
import { dispatchGetListChatbox } from '../../dispatchs/dispatchAccount'

const ChatBoxs = () => {
    const darkTheme = useSelector(themeSelector)
    const listChatbox = useSelector(listChatboxSelector)

    const [limitList, setLimitList] = useState(20)    
    const [hideList, setHideList] = useState(false)
    const [avatarUser, setAvatarUser] = useState()
    const [currentChatboxId, setCurrentChatboxId] = useState()

    const navigate = useNavigate()

    const handleToggleChatList = () => {
        setHideList(!hideList)
    }

    useEffect(() => {
        dispatchGetListChatbox(limitList)
    }, [])

    const navigateToChatbox = (userId, userAvatar, chatboxId) => {
        navigate(`/chat-boxs?user=${userId}`)
        setAvatarUser(userAvatar)
        setCurrentChatboxId(chatboxId)
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
                            onActive={() => navigateToChatbox(item.otherUser.id, item.otherUser.avatar, item.id)}
                            avatar={item.otherUser.avatar}
                            username={item.otherUser.username}
                            lastMessage={item.lastMessage}
                        />
                    ))
                }
                </div>


            </div>

            <ChatContent 
                hideList={hideList}
                darkTheme={darkTheme}
                chatboxId={currentChatboxId}
                avatarUser={avatarUser}
             />

        </div>
    )
}

export default ChatBoxs