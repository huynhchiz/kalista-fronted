import './Comment.scss'
import avatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faUnHeart } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'

import { themeSelector } from '../../../redux/selectors/themeSelector'
import { likeCommentSV, unlikeCommentSV } from '../../../service/postService'
import { dispatchGetInfoComment } from '../../../dispatchs/dispatchComment'

const Comment = ({ data }) => {
    const darkTheme = useSelector(themeSelector)
    const commnentRef = useRef()

    // const [like, setLike] = useState(data.liked)
    const [seeMoreBtn, setSeeMoreBtn] = useState(false)
    const [hideBtn, setHideBtn] = useState(false)
    const [showAllCmt, setShowAllCmt] = useState(false)
    // const [countLike, setCountLike] = useState(0)

    useEffect(() => {
        if (data.comment.length >= 80) {
            setSeeMoreBtn(true)
            setHideBtn(true)
        }
    }, [])

    const handleLike = async () => {
        let res = await likeCommentSV(data.id)
        if (res && +res.EC === 0) {
            dispatchGetInfoComment(data.id)
        }
    }

    const handleUnLike = async () => {
        let res = await unlikeCommentSV(data.id)
        if (res && +res.EC === 0) {
            dispatchGetInfoComment(data.id)
        }
    }

    const handleShowAllCmt = () => {
        setShowAllCmt(true)
        setSeeMoreBtn(false)
    }

    const handleHideCmt = () => {
        setShowAllCmt(false)
        setSeeMoreBtn(true)
    }

    return (
        <div className={`post-comment-item ${darkTheme ? 'post-comment-item-dark' : ''}`}>

            <div className='post-comment-left'>
                <div className='post-comment-user'>
                    <img src={data.User.avatar ? data.User.avatar : avatarUnset} alt='_avatar_cmt' />
                    <p className='post-comment-username'>
                        {data.User.username ? data.User.username : 'unname'}
                    </p>
                </div>

                <p className={`post-comment-content ${!showAllCmt ? 'post-comment-content-hide' : ''}`} ref={commnentRef}>
                    {data.comment}
                </p>

                {seeMoreBtn ?
                    <p className='show-comment-btn' onClick={handleShowAllCmt}>See more...</p>
                    : hideBtn &&
                    <p className='show-comment-btn' onClick={handleHideCmt}>Hide...</p>
                }

                <div className='post-comment-info'>
                    <p className='post-comment-like-count'>
                        {data && data.countLike ? data.countLike : 0} like
                    </p>
                    <p className='post-comment-time'>
                        {
                            data.time + ' ' + data.date
                        }
                    </p>
                </div>
            </div>

            <div className='post-comment-right'>
                {/*  */}
            {data && data.liked ?
                <FontAwesomeIcon className='comment-unlike' icon={faUnHeart} onClick={handleUnLike}/>
            :   
                <FontAwesomeIcon className='comment-like' icon={faHeart} onClick={handleLike} />
            }
            </div>
            
        </div>
    )
}

export default Comment