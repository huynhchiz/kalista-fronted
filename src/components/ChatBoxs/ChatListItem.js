import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatListItem.scss'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { useRef } from 'react'
import unsetAvatar from '../../assets/images/user-avatar-unset.png'

const ChatListItem = ({ avatar, username, onActive, lastMessage }) => {
    const darkTheme = useSelector(themeSelector)
    const chatListItemRef = useRef()

    const handleActive = () => {
        let activeItem = document.querySelector('.chat-list-item-active')
        if(activeItem) {
            activeItem.classList.remove('chat-list-item-active')
        }

        chatListItemRef.current.classList.add('chat-list-item-active')

        onActive()
    }

    return (
        <div 
            className='chat-list-item'
            onClick={handleActive}
            ref={chatListItemRef}
        >
            <span className={darkTheme ? 'chat-list-item-dark' : ''}></span>

            <div className='chat-list-item-left'>
                <img src={avatar ? avatar : unsetAvatar} alt='_avatar-chat' />
            </div>

            <div className='chat-list-item-right'>
                <p className='chat-list-item-username'>{username ? username : 'unname'}</p>

                <div className='chat-list-item-preview-chat'>
                    <p className='preview-chat'>
                        {lastMessage ? lastMessage : ''}
                    </p>
                </div>
            </div>

            <FontAwesomeIcon icon={faEllipsis} className='chat-list-item-options'/>

        </div>
    )
}

export default ChatListItem