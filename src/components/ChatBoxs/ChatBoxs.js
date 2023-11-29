import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatBoxs.scss'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ChatListItem from './ChatListItem'
import ChatMessageItem from './ChatMessageItem'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'

const ChatBoxs = () => {
    const darkTheme = useSelector(themeSelector)
    const [hideList, setHideList] = useState(false)

    const handleToggleChatList = () => {
        setHideList(!hideList)
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
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />

                </div>


            </div>
        

            <div className={`chat-content${hideList ? ' chat-content-full' : ' chat-content-hide'}`}>
                <div className='chat-content-header'>
                    <img src='https://res.cloudinary.com/drk6juqrs/image/upload/v1701228063/qsbfx70fhnc4sa6cj0o9.jpg' alt='_avatar-chat' />
                    <p className='chat-content-header-username'>huynh chi 90524</p>
                </div>

                <div className='chat-content-main'>
                    <ChatMessageItem />
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                    <ChatMessageItem />
                    <ChatMessageItem isAccountMessage/>
                    <ChatMessageItem />
                </div>

                <div className='chat-content-footer'>
                    <input type='text' />
                    <div className='send-message-btn'>SEND</div>
                </div>
            </div>

        </div>
    )
}

export default ChatBoxs