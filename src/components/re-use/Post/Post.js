import './Post.scss'
import BigButton from '../BigButton/BigButton'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'

import { useSelector } from 'react-redux'
import { themeSelector, userLoginSelector } from '../../../redux/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as fTU2, faComments } from '@fortawesome/free-regular-svg-icons'
import { useRef, useState } from 'react'
import { followSV, unfollowSV } from '../../../service/followService'
import { dispatchGetUserFollowing } from '../../../dispatchFunctions/dispatchFollows'
import { likePostSV, unlikePostSV } from '../../../service/postService'

const Post = ({ postId, src, type, alt, caption, date, username, email, avatar, followType }) => {
    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    const [playVideo, setPlayVideo] = useState(false)
    const [seeMoreCaption, setSeeMoreCaption] = useState(false)

    const [like, setLike] = useState(false)

    const videoRef = useRef()

    const handlePlayVideo = () => {
        videoRef.current.play()
        setPlayVideo(true)
    }

    const handlePauseVideo = () => {
        videoRef.current.pause()
        setPlayVideo(false)
    }

    const handleReadCaption = () => {
        if (caption.length > 90) {
            setSeeMoreCaption(!seeMoreCaption)
        }
    }

    const handleFollow = async () => {
        let res = await followSV(email)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUserFollowing(userLogin.account.email, 2)
        }
    }

    const handleUnfollow = async () => {
        let res = await unfollowSV(email)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUserFollowing(userLogin.account.email, 2)
        }
    }

    const handleLikePost = async (postId) => {
        let res = await likePostSV(postId)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            setLike(true)
        }
    }

    const handleUnlikePost = async (postId) => {
        let res = await unlikePostSV(postId)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            setLike(false)
        }
    }

    return (
        <div className={`post ${darkTheme && 'post-dark'}`}>
            <div className='post-frame'>

                <div className='post-user'>
                    <div className='post-avatar'>
                        <img className='' src={avatar ? avatar : userAvatarUnset} alt='avatar'/>
                    </div>

                    <div className='post-username'>
                        <p>{username}</p>
                    </div>

                    {
                        (userLogin.account.email !== email) && 
                        (!followType ? 
                        <div className='post-follow-btn'>
                            <BigButton
                                className={'follow-button'}
                                onClick={handleFollow}
                            >Follow</BigButton>
                        </div>
                            :
                        <div className='post-unfollow-btn'>
                            <BigButton
                                className={'unfollow-button'}
                                onClick={handleUnfollow}
                            >Unfollow</BigButton>
                        </div>)
                    }
                    
                </div>

                <div className='post-content'>
                    {type === 'image' &&  <img src={src} alt={alt} />}
                    {type ==='video' && 
                    <>
                        <video ref={videoRef} src={src} alt={alt} onClick={handlePauseVideo} />
                        {!playVideo &&
                            <div className='play-video-btn'>
                                <FontAwesomeIcon icon={faPlay} onClick={handlePlayVideo}/>
                            </div>
                        }
                    </>

                    }
                </div>

                <div className='post-footer'>
                    <div className='post-interactions'>
                        {
                            caption && seeMoreCaption ?
                            <div className='post-caption post-caption-read' >
                                <p onClick={handleReadCaption}>{caption}</p>
                            </div>
                            : caption &&
                            <div className='post-caption' >
                                <p>{caption}</p>
                                <div className='post-caption-opacity' onClick={handleReadCaption}></div>
                            </div>
                        }

                        <div className='post-comments'>
                            <FontAwesomeIcon icon={faComments} />
                        </div>

                        {
                            like ? 
                            <div className='post-unlike' onClick={() => handleUnlikePost(postId)}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </div> :
                            <div className='post-like' onClick={() => handleLikePost(postId)}>
                                <FontAwesomeIcon icon={fTU2} />
                            </div>
                        }

                    </div>

                    <div className={`post-info ${caption ? '' : 'post-info-top'}`}>
                        <div className='likes-comments'>
                            <p>100 comments</p>
                            <p>{like && 'You and'} 100 people likes this</p>
                        </div>
                        <p>{date}</p>
                    </div>
                </div>

                

            </div>
        </div>
    )
}

export default Post