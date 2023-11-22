import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dispatchGetPostComments, dispatchResetComments } from '../../../dispatchs/dispatchComment'
import { commentsSelector } from '../../../redux/selectors/commentSelector'

import './PreviewPost.scss'
import Comment from '../Comment/Comment'
import SmallLoad from '../SmallLoad/SmallLoad'
import avatarUnset from '../../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { dispatchGetInfoPostExplore } from '../../../dispatchs/dispatchPosts'
import { createCommentSV } from '../../../service/postService'
import { themeSelector } from '../../../redux/selectors/themeSelector'

const PreviewPost = ({ data }) => {
    const darkTheme = useSelector(themeSelector)
    const comments = useSelector(commentsSelector)
    const listComment = comments.list

    const [show, setShow] = useState(false)
    const [comment, setComment] = useState('')
    const [limit, setLimit] = useState(5)
    const [maxComment, setMaxComment] = useState(false)
    const [smallLoad, setSmallLoad] = useState(false)

    const handleChangeCommentValue = (e) => {
        setComment(e.target.value)
    }

    const fetchComments = async () => {
        setSmallLoad(true)
        setTimeout(() => {
            dispatchGetPostComments(data.id, limit)
            setSmallLoad(false)
        }, 1000)
    }
    
    const handleAddLimit = () => {
        setLimit(limit + 5)
    }

    const handleShowPreviewPost = () =>  {
        setShow(true)
        setMaxComment(false)
        fetchComments()
    }

    const handleHidePreviewPost = () =>  {
        setShow(false)
        setLimit(5)
        dispatchResetComments()
    }

    useEffect(() => {
        if(show === true) {
            if(listComment.length < +data.countComment) {
                fetchComments()
            } else {
                setMaxComment(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    
    const buildDataToCreateComment = () => {
        let buildData = {}
        buildData = {
            postId: data.id,
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
                fetchComments();
                dispatchGetInfoPostExplore(data.id)
                setComment('')
            }
        }
    }
    

    return (
        !show ?
        <>
            {data.type === 'image' &&
            <img className='preview-image' src={data.src} alt={data.alt || '_preview-explore'}
            onClick={handleShowPreviewPost}
            />}

            {data.type === 'video' &&
            <video className='preview-video' src={data.src} alt={data.alt || '_preview-explore'} 
            onClick={handleShowPreviewPost}
            />}
        </>
        
        : 

        <div className={`single-post-preview-wrapper${darkTheme ? ' sppw-dark' : ''}`} onClick={handleHidePreviewPost}>
            <div className='single-post-preview-frame' onClick={e => e.stopPropagation()}>
                {/* HEADER */}
                <div className='spp-header'>
                    <div className='spp-avatar-wrapper'>
                        <img src={data.User.avatar ? data.User.avatar : avatarUnset} alt='_avatar' />
                    </div>
                    <h4>{data.User.username ? data.User.username : ''}</h4>
                </div>

                {/* CONTENT */}
                <div className='spp-content'>
                    <div className='spp-content-post'>
                       {data.type === 'image' && <img src={data && data.src} alt={data.alt || '_sppImg'} />}
                       {data.type === 'video' && <video src={data && data.src} alt={data.alt || '_sppImg'} />}
                    </div>

                    <div className='spp-content-comments'>
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

                                    <p className='no-comment'>No comment yet!</p>
                                }

                                {   !smallLoad && (
                                    listComment && listComment.length > 0 && maxComment === false ?
                                    <div className='load-more-cmts-btn'
                                        onClick={() => {handleAddLimit()}}
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
                    <h3>{data.caption ? data.caption : ''}</h3>
                    <p>{data.time + ' --- ' + data.date}</p>
                </div>


            </div>
        </div>
    )
}

export default PreviewPost