import './PostComment.scss'
import { themeSelector } from '../../../redux/selector'
import { useSelector } from 'react-redux'

import Comment from '../Comment/Comment'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { getOnePostCommentsSV } from '../../../service/commentService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import SmallLoad from '../SmallLoad/SmallLoad'

const PostComment = forwardRef(({ postId, countComment }, ref) => {
    const darkTheme = useSelector(themeSelector)
    const [listComment, setListComment] = useState([])
    const [limit, setLimit] = useState(5)
    const [maxComment, setMaxComment] = useState(false)
    const [smallLoad, setSmallLoad] = useState(false)

    useImperativeHandle(ref, () => ({
        fetchComments
    }))

    const fetchComments = async () => {
        setSmallLoad(true)
        let res = await getOnePostCommentsSV(postId, limit)
        setTimeout(() => {
            if(res && +res.EC === 0) {
                setListComment(res.DT)
                setSmallLoad(false)
            } else {
                setSmallLoad(false)
            }
        }, 1000)
    }

    useEffect(() => {
        if(listComment.length < +countComment || listComment.length === 0) {
            fetchComments()
        } else {
            setMaxComment(true)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    const handleAddLimit = () => {
        setLimit(limit + 5)
    }

    return (
        <div className='post-comment-wrapper'>
            <div className={`post-comment ${darkTheme ? 'post-comment-dark' : ''}`}>
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
                    smallLoad ?
                    <div className='small-load-wrapper'>
                        <SmallLoad /> 
                    </div>
                    : <></>
                }

                {
                    maxComment === true &&
                    <p className='max-comment'>
                        No more comments
                    </p>
                }
            </div>
        </div>
        
    )
})

export default PostComment