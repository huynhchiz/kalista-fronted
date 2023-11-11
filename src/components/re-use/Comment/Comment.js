import './Comment.scss'
import avatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faUnHeart } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'

import { themeSelector } from '../../../redux/selector'

const Comment = () => {
    const darkTheme = useSelector(themeSelector)
    const commnentRef = useRef()

    const [like, setLike] = useState(false)
    const [seeMore, setSeeMore] = useState(false)
    const [showAllCmt, setShowAllCmt] = useState(false)

    const comment = 'kahsdhasdkjahsdjhaskjdh akjsdhkjasdhkjasdhkjashdkj ashdkjhasdkjashdkjahsdkj haskjdhaskjdhaskjdhakjsdhkj xin chao jashdkjahsdkjashdk'

    useEffect(() => {
        if (comment.length > 80) {
            setSeeMore(true)
        }
    }, [])

    const handleLike = () => {
        setLike(!like)
    }

    const handleShowAllCmt = () => {
        setShowAllCmt(true)
        setSeeMore(false)
    }

    const handleHideCmt = () => {
        setShowAllCmt(false)
        setSeeMore(true)
    }

    return (
        <div className={`post-comment-item ${darkTheme ? 'post-comment-item-dark' : ''}`}>

            <div className='post-comment-left'>
                <div className='post-comment-user'>
                    {/*  */}
                    <img src={avatarUnset} alt='' />
                    <p className='post-comment-username'>
                    {/*  */}
                        huynh chi
                    </p>
                </div>

                <p className={`post-comment-content ${!showAllCmt ? 'post-comment-content-hide' : ''}`} ref={commnentRef}>
                    {/*  */}
                    {comment}
                </p>

                {seeMore ?
                    <p className='show-comment-btn' onClick={handleShowAllCmt}>See more...</p>
                    :
                    <p className='show-comment-btn' onClick={handleHideCmt}>Hide...</p>
                }

                <div className='post-comment-info'>
                    <p className='post-comment-like-count'>
                        {/*  */}
                        10 liked
                    </p>
                    <p className='post-comment-time'>
                        {/*  */}
                        10/10/2023
                    </p>
                </div>
            </div>

            <div className='post-comment-right'>
                {/*  */}
            {like ?
                <FontAwesomeIcon className='comment-unlike' icon={faUnHeart} onClick={handleLike}/>
            :   
                <FontAwesomeIcon className='comment-like' icon={faHeart} onClick={handleLike} />
            }
            </div>
            
        </div>
    )
}

export default Comment