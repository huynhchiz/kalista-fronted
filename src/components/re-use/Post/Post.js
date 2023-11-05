import './Post.scss'
import BigButton from '../BigButton/BigButton'

import { useSelector } from 'react-redux'
import { themeSelector, userLoginSelector } from '../../../redux/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faPlay, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { followSV } from '../../../service/followService'

const Post = ({ src, type, alt, caption, date, username, email, avatar }) => {
    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    const [playVideo, setPlayVideo] = useState(false)
    const [seeMoreCaption, setSeeMoreCaption] = useState(false)

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
        }
    }

    return (
        <div className={`post ${darkTheme && 'post-dark'}`}>
            <div className='post-frame'>

                <div className='post-user'>
                    <div className='post-avatar'>
                        <img className='' src={avatar} alt='avatar'/>
                    </div>

                    <div className='post-username'>
                        <p>{username}</p>
                    </div>

                    {
                        userLogin.account.email !== email ? 
                        <div className='post-follow-btn'>
                            <BigButton
                                className={'follow-button'}
                                onClick={handleFollow}
                            >Follow</BigButton>
                        </div> : <></>
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
                        <div className='post-like'>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </div>
                    </div>

                    <div className={`post-info ${caption ? '' : 'post-info-top'}`}>
                        <p>100 comments</p>
                        <p>{date}</p>
                    </div>
                </div>

                

            </div>
        </div>
    )
}

export default Post