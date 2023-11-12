import './PostComment.scss'
import { themeSelector } from '../../../redux/selector'
import { useSelector } from 'react-redux'

import Comment from '../Comment/Comment'
import { createCommentSV } from '../../../service/commentService'
import { useEffect, useState } from 'react'
import { getOnePostCommentsSV } from '../../../service/commentService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { countOnePostComments } from '../../../service/postService'

const PostComment = ({ postId, countComment }) => {
    const darkTheme = useSelector(themeSelector)
    const [comment, setComment] = useState('')
    const [listComment, setListComment] = useState([])
    const [limit, setLimit] = useState(2)
    const [maxComment, setMaxComment] = useState(false)
    const [countCmt, setCountCmt] = useState(countComment)

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
                let res2 = await countOnePostComments(postId)
                if(res2 && +res2.EC === 0) {
                    setLimit(limit + 1)
                    setCountCmt(res2.DT)
                }
                fetchComments();
                setComment('')
            }
        }
    }

    const fetchComments = async () => {
        let res = await getOnePostCommentsSV(postId, limit)
        if(res && +res.EC === 0) {
            setListComment(res.DT)
        }
    }

    useEffect(() => {
        if(listComment.length < +countCmt || listComment.length === 0) {
            fetchComments()
        } else {
            setMaxComment(true)
        }
    }, [limit])

    const handleAddLimit = () => {
        setLimit(limit + 2)
    }

    return (
        <div className={`post-comment ${darkTheme ? 'post-comment-dark' : ''}`}>

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
                    <FontAwesomeIcon icon={faCirclePlus} /> <p>Load more comments...</p>
                </div> : <></>
            }

            {
                maxComment === true &&
                <p className='max-comment'>
                    No more comments
                </p>
            }
        </div>
    )
}

export default PostComment