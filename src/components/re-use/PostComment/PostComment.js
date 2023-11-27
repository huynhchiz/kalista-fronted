import './PostComment.scss'
import Comment from '../Comment/Comment'
import SmallLoad from '../SmallLoad/SmallLoad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { createCommentSV } from '../../../service/postService'
import { themeSelector } from '../../../redux/selectors/themeSelector'
import { commentsSelector } from '../../../redux/selectors/commentSelector'
import { dispatchGetPostComments, dispatchResetComments } from '../../../dispatchs/dispatchComment'
import { dispatchGetInfoPostHome } from '../../../dispatchs/dispatchPosts'
import ImageZoom from '../ImageZoom/ImageZoom'

const PostComment = forwardRef(({ src, postId, countComment, typePost }, ref) => {
    const darkTheme = useSelector(themeSelector)
    const comments = useSelector(commentsSelector)
    const listComment = comments.list
    
    const [limit, setLimit] = useState(5)
    const [maxComment, setMaxComment] = useState(false)
    const [smallLoad, setSmallLoad] = useState(false)
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState('')
    const [playVideo, setPlayVideo] = useState(false)

    const videoRef = useRef()

    useImperativeHandle(ref, () => ({
        fetchComments,
        handleShow
    }))

    const handleShow = () => {
        setShow(true)
    }

    const handleHide = () => {
        dispatchResetComments()
        setShow(false)
    }

    const fetchComments = async () => {
        setSmallLoad(true)
        setTimeout(() => {
            dispatchGetPostComments(postId, limit)
            setSmallLoad(false)
        }, 1000)
    }

    useEffect(() => {
        if(show) {
            if(listComment.length < +countComment || listComment.length === 0) {
                fetchComments()
            } else {
                setMaxComment(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    const handleAddLimit = () => {
        setLimit(limit + 5)
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
                fetchComments();
                dispatchGetInfoPostHome(postId)
                setComment('')
            }
        }
    }

    const handleTogglePlayVideo = () => {
        if (videoRef.current.paused) {
            setPlayVideo(true)
            videoRef.current.play()
        } else {
            setPlayVideo(false)
            videoRef.current.pause()
        }
    }

    return (
        show &&
        <div className={`post-comment-wrapper${darkTheme ? ' post-comment-wrapper-dark' : ''}`}
            onClick={handleHide}        
        >
            <div className='post-comment-container' onClick={e => e.stopPropagation()}>
                <div className='post-preview'>
                    {typePost === 'image' && <ImageZoom src={src} alt='_preview-img' className={'image-unzoom'}/>}
                    {typePost === 'video' && <>
                        <video
                            src={src} alt='_preview-img'
                            ref={videoRef}                   
                        />
                        {!playVideo ?
                            <div className='play-btn'                            
                                onClick={handleTogglePlayVideo}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div> :
                            <div className='pause-btn'
                                onClick={handleTogglePlayVideo}>
                                <FontAwesomeIcon icon={faPause} />
                            </div>
                        }
                    </>
                        
                    }
                </div>
                
                <div className='post-comment' >
                    <div className='post-comment-header'>
                        <h4>Comments</h4>
                    </div>

                    <div className='comment-edit'>
                        <textarea
                            placeholder='Insert your comment...'
                            maxLength={120}
                            value={comment}
                            onChange={e => {handleChangeCommentValue(e)}}
                        />
                        <div className='create-comment-btn'
                        onClick={handleCreateComment}
                        >
                            Send
                        </div>
                    </div>

                    <div className='post-comment-content'>
                        {
                            listComment && listComment.length > 0 ?
                            listComment.map(commentData => (
                                <Comment
                                    key={commentData.id}
                                    data={commentData}
                                />
                            )) :

                            <p className='no-comment'>No comment yet!</p>
                        }

                        {
                            listComment && listComment.length > 0 && maxComment === false ?
                            <div className='load-more-cmts-btn'
                                onClick={() => {handleAddLimit()}}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <p>Load more comments...</p>
                            </div> : <></>
                        }
                        {
                            smallLoad &&
                            <div className='small-load-wrapper'>
                                <SmallLoad /> 
                            </div>
                        }

                        {
                            maxComment === true &&
                            <p className='max-comment'>
                                No more comments
                            </p>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
})

export default PostComment