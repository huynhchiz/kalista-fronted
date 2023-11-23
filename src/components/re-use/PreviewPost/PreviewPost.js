import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { createCommentSV } from '../../../service/postService'
import { dispatchGetPostComments, dispatchResetComments } from '../../../dispatchs/dispatchComment'
import { dispatchGetInfoPostExplore } from '../../../dispatchs/dispatchPosts'
import { commentsSelector } from '../../../redux/selectors/commentSelector'
import { themeSelector } from '../../../redux/selectors/themeSelector'
import { explorePostsSelector } from '../../../redux/selectors/postSelector'

import './PreviewPost.scss'
import Comment from '../Comment/Comment'
import SmallLoad from '../SmallLoad/SmallLoad'
import avatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faBackward, faCirclePlus, faForward, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'

const PreviewPost = ({ data }) => {
    const darkTheme = useSelector(themeSelector)
    const comments = useSelector(commentsSelector)
    const listComment = comments.list
    const explorePosts = useSelector(explorePostsSelector)
    const listExplore = explorePosts.list

    const [dataPreview, setDataPreview] = useState(data)
    const [show, setShow] = useState(false)
    const [comment, setComment] = useState('')
    const [limit, setLimit] = useState(5)
    const [maxComment, setMaxComment] = useState(false)
    const [smallLoad, setSmallLoad] = useState(false)
    const [playVideo, setPlayVideo] = useState(false)
    const [showCommentResponeSive, setShowCommentResponsive] = useState(false)

    const handleChangeCommentValue = (e) => {
        setComment(e.target.value)
    }

    const fetchComments = async () => {
        setSmallLoad(true)
        setTimeout(() => {
            dispatchGetPostComments(dataPreview.id || data.id, limit)
            setSmallLoad(false)
        }, 1000)
    }
    
    const handleAddLimit = () => {
        setLimit(limit + 5)
    }

    const handleShowPreviewPost = () =>  {
        setShowCommentResponsive(false)
        setShow(true)
        setMaxComment(false)
        fetchComments()
        setDataPreview(data)
    }

    const handleHidePreviewPost = () =>  {
        setShow(false)
        setLimit(5)
        dispatchResetComments()
        handlePauseVideo()
    }

    useEffect(() => {
        if(show === true) {
            if(listComment.length < (+dataPreview.countComment)) {
                fetchComments()
            } else {
                setMaxComment(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, dataPreview])

    
    const buildDataToCreateComment = () => {
        let buildData = {}
        buildData = {
            postId: dataPreview.id || data.id,
            comment: comment,
            date: (new Date().toLocaleDateString()).toString(),
            time: (new Date().toLocaleTimeString()).toString(),
        }
        return buildData;
    }

    const handleCreateComment = async () => {
        if(comment && comment.length < 150) {
            let buildData = buildDataToCreateComment()
            let res = await createCommentSV(buildData)
            if(res && +res.EC === 0) {
                dispatchGetInfoPostExplore(dataPreview.id)
                fetchComments();
                setComment('')
            }
        }
    }

    const handleNextPost = (e) => {
        e.stopPropagation()
        handlePauseVideo()
        setComment('')
        dispatchResetComments()
        setMaxComment(false)
        setLimit(5)
        let indexPost = listExplore.findIndex(item => (item.id === dataPreview.id))
        setDataPreview(listExplore[+indexPost + 1])
    }

    const handlePrevPost =  (e) => {
        e.stopPropagation()
        handlePauseVideo()
        setComment('')
        dispatchResetComments()
        setMaxComment(false)
        setLimit(5)
        let indexPost = listExplore.findIndex(item => (item.id === dataPreview.id))
        setDataPreview(listExplore[+indexPost -1])
    }

    const videoRef = useRef()
    const handlePlayVideo = () => {
        setPlayVideo(true)
        videoRef.current.play()
    }

    const handlePauseVideo = () => {
        if(playVideo) {
            setPlayVideo(false)
            videoRef.current.pause()
        }
    }

    return (
        !show ?
        <div className='preview-unshown'>
            {data.type === 'image' &&
            <img className='preview-image' src={data.src} alt={data.alt || '_preview-explore'}
            onClick={handleShowPreviewPost}
            />}

            {data.type === 'video' &&
                <>
                    <video className='preview-video' src={data.src} alt={data.alt || '_preview-explore'} 
                        onClick={handleShowPreviewPost}
                    />
                    <FontAwesomeIcon icon={faPlay} className='preview-video-icon' />
                </>
            }
        </div>
        
        : dataPreview && (
            <div className={`single-post-preview-wrapper${darkTheme ? ' sppw-dark' : ''}`} onClick={handleHidePreviewPost}>
                {!showCommentResponeSive &&
                <> 
                    {
                        // previous post
                        (+listExplore.findIndex(item => (item.id === dataPreview.id)) !== 0) &&
                        <div className='prev-post-btn' onClick={e => handlePrevPost(e)}>
                            <FontAwesomeIcon icon={faBackward} className='prev-post-icon' />
                        </div>
                    }
                    {
                        // next post
                        (+listExplore.findIndex(item => (item.id === dataPreview.id)) !== +(listExplore.length - 1)) &&
                        <div className='next-post-btn' onClick={e => handleNextPost(e)}>
                            <FontAwesomeIcon icon={faForward} className='next-post-icon' />
                        </div> 
                    }            
                </>
                }
                
                <div className='single-post-preview-frame' onClick={e => e.stopPropagation()}>
                
                    {/* HEADER */}
                    <div className='spp-header'>
                        <div className='spp-info-user'>
                            <div className='spp-avatar-wrapper'>
                                <img src={dataPreview.User.avatar ? dataPreview.User.avatar : avatarUnset} alt='_avatar' />
                            </div>
                            <h4>{dataPreview.User.username ? dataPreview.User.username : ''}</h4>
                        </div>
                        {   !showCommentResponeSive ?
                            <div className='read-comment-btn' onClick={() => setShowCommentResponsive(true)}>
                                comments <FontAwesomeIcon icon={faComments} />
                            </div> : 
                            <div className='hide-comment-btn' onClick={() => setShowCommentResponsive(false)}>
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </div>
                        }
                    </div>

                    {/* CONTENT */}
                    <div className='spp-content'>
                    
                        <div className={`spp-content-post${showCommentResponeSive ? ' spp-content-post-hide' : ''}`}>                        
                            {dataPreview && (dataPreview.type === 'image' && <img src={dataPreview && dataPreview.src} alt={dataPreview.alt || '_sppImg'} />)}
                            {dataPreview && (dataPreview.type === 'video' && 
                            <>
                                <video src={dataPreview && dataPreview.src} alt={dataPreview.alt || '_sppImg'} 
                                    ref={videoRef} onClick={handlePauseVideo}
                                />
                                {!playVideo &&
                                <FontAwesomeIcon icon={faPlay} className='play-preview-video-btn' onClick={handlePlayVideo}/>
                                }
                            </>
                            
                            )}                        
                        </div>
                        
                    
                    
                        <div className={`spp-content-comments${showCommentResponeSive ? ' spp-content-comments-responsive' : ''}`}>
                            <div className='spp-comments-frame'>

                                <div className ='comment-edit'>
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

                                        (
                                            !smallLoad &&
                                            <p className='no-comment'>No comment yet!</p>
                                        )
                                        
                                    }

                                    {   !smallLoad && (
                                        listComment && listComment.length > 0 && maxComment === false ?
                                        <div className='load-more-cmts-btn'
                                            onClick={handleAddLimit}
                                        >
                                            <FontAwesomeIcon icon={faCirclePlus} />
                                            <p>Load more comments...</p>
                                        </div> 
                                        : <></>)
                                        
                                    }
                                    {
                                        smallLoad &&
                                        <div className='small-load-wrapper'>
                                            <SmallLoad /> 
                                        </div>
                                    }

                                    {
                                        (listComment && listComment.length > 0 ) &&
                                        maxComment === true &&
                                        <p className='max-comment'>
                                            No more comments
                                        </p>
                                    }
                                </div>

                            </div>
                        </div>
                                       
                    </div>

                    {/* FOOTER */}
                    <div className='spp-footer'>
                        <h3>{dataPreview.caption ? dataPreview.caption : ''}</h3>
                        <p>{dataPreview.time + ' --- ' + dataPreview.date}</p>
                    </div>


                </div>
            </div>
        )
    )
}

export default PreviewPost