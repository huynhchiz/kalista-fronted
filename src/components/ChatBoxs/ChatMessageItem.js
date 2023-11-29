import './ChatMessageItem.scss'

const ChatMessageItem = ({ isAccountMessage = false }) => {


    return (
        <div className='chat-message-item'>
            <div className={`message-item ${isAccountMessage ? ' message-item-account' : ''}`}>
                <p className='message-item-content'>
                    xin chao moi nguoi
                </p>

                <p className='message-item-time'>
                    12h00 20/11/2023
                </p>
                
            </div>
        </div> 
        
    )
}

export default ChatMessageItem