import './Post.scss'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as fTU2, faComments } from '@fortawesome/free-regular-svg-icons'
import { faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Waypoint } from 'react-waypoint'
import PostComment from '../PostComment/PostComment'

import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { themeSelector } from '../../../redux/selectors/themeSelector'
import { dispatchSetScrollHome, dispatchSetScrollExplore } from '../../../dispatchs/dispatchScrollPosition'
import { likePostSV, unlikePostSV } from '../../../service/postService'
import { dispatchGetInfoPostHome } from '../../../dispatchs/dispatchPosts'

const Post = ({ className = '', postId, src, type, alt, caption, date, username, userId, email, avatar, countLike, countComment, liked, showUserInfo = true }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const darkTheme = useSelector(themeSelector)

    const [playVideo, setPlayVideo] = useState(false)
    const [seeMoreCaption, setSeeMoreCaption] = useState(false)

    const videoRef = useRef()
    const postCommentRef = useRef()

    const handlePlayVideo = () => {
        const videos = document.querySelectorAll('video')
        if(videos && videos.length > 0) {
            for (let i = 0; i < videos.length; i++) {
                videos[i].pause()
            }
        }
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

    const handleLikePost = async (postId) => {
        let res = await likePostSV(postId)
        if(res && +res.EC === 0) {
            dispatchGetInfoPostHome(postId)
        }
    }

    const handleUnlikePost = async (postId) => {
        let res = await unlikePostSV(postId)
        if(res && +res.EC === 0) {
            dispatchGetInfoPostHome(postId)
        }
    }
    
    const handleNavigateToProfile = () => {
        if(location.pathname === '/') {
            dispatchSetScrollHome(window.scrollY)
        }
        if(location.pathname === '/explore') {
            dispatchSetScrollExplore(window.scrollY)
        }

        navigate(`/profile?user=${userId}`)
    }

    const handleShowComments = () => {
        postCommentRef.current.handleShow()
        postCommentRef.current.fetchComments();
    }

    return (
        <div className={`post${darkTheme ? ' post-dark' : ''}`}>
            <div className='post-frame'>

                {
                    showUserInfo ? 
                    <div className='post-user'>
                        <div className='post-avatar' onClick={handleNavigateToProfile}>
                            <img className='' src={avatar ? avatar : userAvatarUnset} alt='avatar'/>
                        </div>

                        <div className='post-username'>
                            <p onClick={() => handleNavigateToProfile(userId)} >
                                {username}
                            </p>
                        </div>
                        
                    </div>
                    : 
                    <div className={`no-user-info ${className}`}></div>
                }
                

                <div className='post-content'>
                    {type === 'image' &&  <img src={src} alt={alt} onClick={handleShowComments}/>}
                    {type ==='video' && 
                    <>
                        <Waypoint
                            onLeave={handlePauseVideo}
                        />
                        <video ref={videoRef} src={src} alt={alt} onClick={handlePauseVideo} />
                        {!playVideo &&
                            <div className='play-video-btn'>
                                <FontAwesomeIcon icon={faPlay} onClick={handlePlayVideo}/>
                            </div>
                        }
                    </>

                    }
                </div>

                <div className='post-footer-wrapper'>                
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

                            <div className='post-comments'
                                onClick={handleShowComments}
                            >
                                <FontAwesomeIcon icon={faComments} />
                            </div>

                            {
                                liked === true ? 
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
                                {
                                    <p>{countComment ? countComment : '0'} comments</p>
                                }
                                {
                                    liked && 
                                    <p className='liked-noti'>You liked this post</p>
                                }
                                {
                                    countLike > 0 ?
                                    <p>{countLike >= 2 ? countLike + ' likes' : countLike + ' like'}</p>
                                    :
                                    <p>0 like</p>
                                }
                            </div>
                            <p>{date}</p>
                        </div>
                    </div> 
                </div>
                <PostComment
                    ref={postCommentRef}
                    src={src}
                    postId={postId}
                    typePost={type}
                    countComment={countComment}
                />
            </div>
        </div>
    )
}

export default Post