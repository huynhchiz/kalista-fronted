import './Explore.scss'
import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useSelector } from 'react-redux'

import Post from '../re-use/Post/Post'

import { themeSelector, postsSelector } from '../../redux/selector'
import { dispatchGetExplorePosts } from '../../dispatchFunctions/dispatchPosts'

const Explore = () => {
    const darkTheme = useSelector(themeSelector)
    const posts = useSelector(postsSelector)
    const postsExplore = posts.explorePosts

    const [limit, setLimit] = useState(5)
    const [fullPost, setFullPost] = useState(false)

    const handleAddLimit = () => {
        let condition = (+postsExplore.length < +limit - 5)
        if (!condition) {
            setLimit(limit => limit + 5)
        } else if (condition) {
            setFullPost(true)
        }
    }

    useEffect(() => {
        if(limit > 5) {
            dispatchGetExplorePosts(limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className={`home ${darkTheme ? 'home-dark' : ''}`}>
        {postsExplore && postsExplore.map(post => (
            <Post
                key={'ex' + post.id}
                postId={post.id}
                src={post.src}
                type={post.type}
                alt={post.alt}
                caption={post.caption}
                date={post.date}
                username={post.User.username}
                email={post.User.email}
                avatar={post.User.avatar}
                followType={post.followType}
                countLike={post.postLikeCount}
                countComment={post.postCommentCount}
                liked={post.liked}
            />
        ))}
        <div className='home-footer'>
            <Waypoint
                onEnter={handleAddLimit}
            />
            {
                fullPost ?
                <p className={darkTheme ? 'dark' : ''}>Nothing new...</p>
                :
                postsExplore.length > 0 ?

                <p className={darkTheme ? 'dark' : ''}
                >Loading more posts...</p>

                :
                <p className={darkTheme ? 'dark' : ''}
                    onClick={() => {dispatchGetExplorePosts(limit)}}>
                    Click to see more posts
                </p>
            }
        </div>
    </div>
    )
}

export default Explore