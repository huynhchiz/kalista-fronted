import './PostComment.scss'
import { themeSelector } from '../../../redux/selector'
import { useSelector } from 'react-redux'

import Comment from '../Comment/Comment'
import { createCommentSV } from '../../../service/commentService'
import { useState } from 'react'

const PostComment = ({ postId }) => {
    const darkTheme = useSelector(themeSelector)
    const [comment, setComment] = useState('')

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
        let data = buildDataToCreateComment()
        let res = await createCommentSV(data)
        if(res && +res.EC === 0) {
            console.log(res.DT);
        }
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

            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}

export default PostComment