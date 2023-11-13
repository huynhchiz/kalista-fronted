import { useSearchParams } from 'react-router-dom'

import './PreviewPost.scss'

import Post from '../Post/Post'
import { useEffect } from 'react'
import { dispatchPreviewOnePost } from '../../../dispatchFunctions/dispatchPosts'
import { useSelector } from 'react-redux'
import { previewPostSelector } from '../../../redux/selector'

const PreviewPost = () => {
    const [searchParam, setSearchParam] = useSearchParams()
    const paramPostId = searchParam.get('post')
    
    const post = useSelector(previewPostSelector)

    useEffect(() => {
        dispatchPreviewOnePost(paramPostId)
    }, [paramPostId])

    return (
        <div className='single-post'>
            <Post
                postId={post.postId || paramPostId}
                src={post.src}
                type={post.type}
                alt={post.alt}
                caption={post.caption}
                date={post.date}
                username={post.username}
                email={post.email}
                avatar={post.avatar}
                countLike={post.countLike}
                countComment={post.countComment}
                liked={post.liked}
            />
        </div>
    )
}

export default PreviewPost