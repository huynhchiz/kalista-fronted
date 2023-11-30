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

const ChatBoxs = () => {
    const darkTheme = useSelector(themeSelector)

    const [hideList, setHideList] = useState(false)
    const [listMessage, setListMessage] = useState([])

    const [searchParams] = useSearchParams()
    const userIdParam = searchParams.get('user')
    console.log({userIdParam});

    const navigate = useNavigate()

    const handleToggleChatList = () => {
        setHideList(!hideList)
    }

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

    const navigateToChatbox = () => {
        navigate(`/chat-boxs?user=2`)
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
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                        <ChatListItem
                            key={'key' + item} 
                            onActive={navigateToChatbox}
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