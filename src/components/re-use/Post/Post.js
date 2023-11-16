import './Post.scss'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as fTU2, faComments } from '@fortawesome/free-regular-svg-icons'
import { faCircleXmark, faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import PostComment from '../PostComment/PostComment'
import { Waypoint } from 'react-waypoint'

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { themeSelector } from '../../../redux/selector'
import { dispatchSetScrollHome, dispatchSetScrollExplore } from '../../../dispatchFunctions/dispatchScrollPosition'
import { countOnePostLike, likePostSV, previewOnePost, unlikePostSV } from '../../../service/postService'
import { createCommentSV } from '../../../service/commentService'

const Post = ({ postId, src, type, alt, caption, date, username, userId, email, avatar, countLike, countComment, liked }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const darkTheme = useSelector(themeSelector)

    const [playVideo, setPlayVideo] = useState(false)
    const [seeMoreCaption, setSeeMoreCaption] = useState(false)
    const [countLiked, setCountLiked] = useState(countLike)
    const [countComments, setCountComments] = useState(countComment)
    const [like, setLike] = useState(liked)
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [commentLeft, setCommentLeft] = useState(false)

    const videoRef = useRef()
    const postCommentRef =useRef()

    const fetchInfoPost = async () => {
        let res = await previewOnePost(postId)
        if (res && +res.EC === 0) {
            setCountLiked(res.DT.countLike)
            setCountComments(res.DT.countComment)
        }
    }

    useEffect(() => {
        if(location.pathname === '/preview') {
            fetchInfoPost()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

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
            fetchInfoPost()
            setLike(true)
        }
    }

    const handleUnlikePost = async (postId) => {
        let res = await unlikePostSV(postId)
        if(res && +res.EC === 0) {
            let res2 = await countOnePostLike(postId)
            if (res2 && +res2.EC === 0) {
                fetchInfoPost()
                setLike(false)
            }
        }
    }
    
    const handleNavigateToProfile = (userId) => {
        if(location.pathname === '/') {
            dispatchSetScrollHome(window.scrollY)
        }
        if(location.pathname === '/explore') {
            dispatchSetScrollExplore(window.scrollY)
        }

        navigate(`/profile?user=${userId}`)
    }

    const handleShowComments = () => {
        setShowComments(true)
        setCommentLeft(true)
    }

    const handleHideComments = () => {
        setShowComments(false)
        setCommentLeft(false)
    }

    const handleChangeCommentValue = (e) => {
        setComment(e.target.value)
    }

    const buildDataToCreateComment = () => {
        let data = {}
        data = {
            postId: postId,
            comment: comment,
            date: (new Date().toLocaleDateString()).toString(),
            time: (new Date().toLocaleTimeString()).toString(),
        }
        return data;
    }

    const handleCreateComment = async () => {
        if(comment && comment.length < 150) {
            let data = buildDataToCreateComment()
            let res = await createCommentSV(data)
            if(res && +res.EC === 0) {
                postCommentRef.current.fetchComments();
                fetchInfoPost()
                setComment('')
            }
        }
    }

    return (
        <div className={`post ${darkTheme ? 'post-dark' : ''} ${commentLeft ? 'post-resposive-left' : ''}`}>
            <div className='post-frame'>

                <div className='post-user'>
                    <div className='post-avatar' onClick={() => handleNavigateToProfile(email)}>
                        <img className='' src={avatar ? avatar : userAvatarUnset} alt='avatar'/>
                    </div>

                    <div className='post-username'>
                        <p onClick={() => handleNavigateToProfile(userId)} >
                            {username}
                        </p>
                    </div>
                    
                </div>

                <div className='post-content'>
                    {type === 'image' &&  <img src={src} alt={alt} />}
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
                {
                    showComments ? 
                    <><div className='hide-comment-btn' onClick={handleHideComments}>
                       ------------------------------------ Hide comments ------------------------------------
                    </div> 
                    <FontAwesomeIcon icon={faCircleXmark} className='hide-comment-btn-icon' onClick={handleHideComments} />
                    </>
                    : <></>
                }

                {   !showComments ?
                        
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
                                    like === true ? 
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
                                        <p>{countComments ? countComments : '0'} comments</p>
                                    }
                                    {
                                        like && 
                                        <p className='liked-noti'>You liked this post</p>
                                    }
                                    {
                                        countLiked > 0 ?
                                        <p>{countLiked >= 2 ? countLiked + ' likes' : countLiked + ' like'}</p>
                                        :
                                        <p>0 like</p>
                                    }
                                </div>
                                <p>{date}</p>
                            </div>
                        </div> 
                        
                        :

                        <>
                            <div className='comment-edit'>
                                <textarea
                                    placeholder='Insert your comment...'
                                    maxLength={120}
                                    value={comment}
                                    onChange={e => {handleChangeCommentValue(e)}}
                                />
                                <div className='create-comment-btn' onClick={handleCreateComment}>
                                    Send
                                </div>
                            </div>

                            <PostComment
                                ref={postCommentRef}
                                postId={postId}
                                countComment={countComments}
                            />
                        </>
                }
                </div>
                
                
            </div>
        </div>
    )
}

export default Post