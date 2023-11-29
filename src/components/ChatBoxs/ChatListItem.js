import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatListItem.scss'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const ChatListItem = () => {
    return (
        <div className='chat-list-item chat-list-item-active'>

            <div className='chat-list-item-left'>
                <img src='https://res.cloudinary.com/drk6juqrs/image/upload/v1701228063/qsbfx70fhnc4sa6cj0o9.jpg' alt='_avatar-chat' />
            </div>

            <div className='chat-list-item-right'>
                <p className='chat-list-item-username'>huynh chi 90524</p>

                <div className='chat-list-item-preview-chat'>
                    <p className='preview-chat'>
                        hello ban
                    </p>
                </div>
            </div>

            <FontAwesomeIcon icon={faEllipsis} className='chat-list-item-options'/>

        </div>
    )
}

export default ChatListItem