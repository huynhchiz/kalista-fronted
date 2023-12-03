import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChatBoxs.scss'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import ChatListItem from './ChatListItem'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import ChatContent from './ChatContent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getChatbox } from '../../service/messageService'
import { accFollowingsSelector } from '../../redux/selectors/accountSelector'
import { dispatchGetAccountFollowings } from '../../dispatchs/dispatchAccount'

const ChatBoxs = () => {
    const darkTheme = useSelector(themeSelector)
    const followings = useSelector(accFollowingsSelector)
    const listFollowings = followings.list

    console.log(listFollowings);

    const [hideList, setHideList] = useState(false)
    const [listMessage, setListMessage] = useState([])
    const [limitFollowings, setLimitFollowings] = useState(15)

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')

    const navigate = useNavigate()

    const handleToggleChatList = () => {
        setHideList(!hideList)
    }

    useEffect(() => {
        dispatchGetAccountFollowings(limitFollowings)
    }, [])

    const fetchChatbox = async () =>  {
        let res = await getChatbox(+userIdParam, 5)
        if (res && +res.EC === 0) {
            setListMessage(res.DT)
        }
    }
    
    useEffect(() => {
        if(userIdParam) {
            fetchChatbox()
        }
    }, [userIdParam])

    const navigateToChatbox = (userId) => {
        navigate(`/chat-boxs?user=${userId}`)
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
                    listFollowings?.length > 0 && 
                    listFollowings.map(item => (
                        <ChatListItem
                            key={'key' + item.id} 
                            onActive={() => navigateToChatbox(item.id)}
                            avatar={item.avatar}
                            username={item.username}
                        />
                    ))
                }
                </div>


            </div>

            <ChatContent hideList={hideList} darkTheme={darkTheme} listMessage={listMessage}/>

        </div>
    )
}

export default ChatBoxs