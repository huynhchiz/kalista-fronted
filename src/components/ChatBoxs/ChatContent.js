import { useSelector } from 'react-redux';
import './ChatContent.scss'
import ChatMessageItem from './ChatMessageItem'
import { accInfoSelector } from '../../redux/selectors/accountSelector';

const ChatContent = ({ hideList, darkTheme, listMessage }) => {
    const accountInfo = useSelector(accInfoSelector)
    const accountId = accountInfo.userId

    console.log({listMessage});
    
    return (
        <div className={`chat-content${hideList ? ' chat-content-full' : ' chat-content-hide'}${darkTheme ? ' chat-content-dark' : ''}`}>
            <div className='chat-content-header'>
                <img src='https://res.cloudinary.com/drk6juqrs/image/upload/v1701228063/qsbfx70fhnc4sa6cj0o9.jpg' alt='_avatar-chat' />
                <p className='chat-content-header-username'>huynh chi 90524</p>
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
                <input type='text' />
                <div className='send-message-btn'>SEND</div>
            </div>
        </div>
    )
}

export default ChatContent