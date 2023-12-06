import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatBoxs.scss'
import { faBars, faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import ChatContent from './ChatContent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { listChatboxSelector } from '../../redux/selectors/accountSelector'
import { dispatchGetListChatbox } from '../../dispatchs/dispatchAccount'


const ChatBoxs = ({ socketRef }) => {
    const darkTheme = useSelector(themeSelector)
    const listChatbox = useSelector(listChatboxSelector)
    const listChatboxId = listChatbox.map(item => item.id)
    // const listChatboxUserId = listChatbox.map(item => item.otherUser.id)

    const [limitList, setLimitList] = useState(20)    
    const [hideList, setHideList] = useState(false)
    const [avatarUser, setAvatarUser] = useState()
    const [username, setUsername] = useState('')
    const [currentUserId, setCurrentUserId] = useState()
    const [currentChatboxId, setCurrentChatboxId] = useState()

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')

    const navigate = useNavigate()

    
    
    useEffect(() => {
        listChatboxId.forEach(item => {
            socketRef.current.on(`sendMessageFromChatbox${item}`, dataGot => {
                dispatchGetListChatbox(limitList)
            })
        });

        // console.log(listChatboxUserId);
        // listChatboxUserId.forEach(item => {
        //     socketRef.current.on(`checkOnline${item}`, data => {
        //         console.log('check online ', data);
        //     })
        // })
        
        // listChatboxUserId.forEach(item => {
        //     socketRef.current.on(`checkOffline${item}`, data => {
        //         console.log('check offline ', data);
        //     })
        // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleChatList = () => {
        setHideList(!hideList)
    }

    useEffect(() => {
        dispatchGetListChatbox(limitList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limitList])

    const navigateToChatbox = (userId, username, userAvatar, chatboxId) => {
        navigate(`/chat-boxs?user=${userId}`)
        setCurrentUserId(userId)
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
                    <div className='chat-list-add' onClick={() => setLimitList(limitList + 20)}>
                        <p>load more</p>
                        <FontAwesomeIcon icon={faCirclePlus} className='chat-list-add-icon' />
                    </div>
                </div>


            </div>

            {
                userIdParam && 
                <ChatContent 
                    hideList={hideList}
                    darkTheme={darkTheme}
                    chatboxId={currentChatboxId}
                    avatarUser={avatarUser}
                    userId={currentUserId}
                    username={username}
                    socketRef={socketRef}
                />
            }

        </div>
    )
}

export default ChatBoxs