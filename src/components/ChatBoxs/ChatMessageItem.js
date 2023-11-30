import { useSelector } from 'react-redux'
import './ChatMessageItem.scss'
import { themeSelector } from '../../redux/selectors/themeSelector'

const ChatMessageItem = ({ isAccountMessage = false, message, dateTime }) => {
    const darkTheme = useSelector(themeSelector)


    return (
        <div className={`chat-message-item${darkTheme ? ' chat-message-item-dark' : ''}`}>
            <div className={`message-item ${isAccountMessage ? ' message-item-account' : ''}`}>
                <p className='message-item-content'>
                    {message}
                </p>

                <p className='message-item-time'>
                    {dateTime}
                </p>
                
            </div>
        </div> 
        
    )
}

export default ChatMessageItem