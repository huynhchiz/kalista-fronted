import './Explore.scss'
import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useSelector } from 'react-redux'

import Post from '../re-use/Post/Post'

import { themeSelector } from '../../redux/selectors/themeSelector'
// import { dispatchAddLimitExplorePosts, dispatchGetExplorePosts } from '../../dispatchFunctions/dispatchPosts'
import { positionScrollSelector } from '../../redux/selectors/postSelector'

const Explore = () => {
    const darkTheme = useSelector(themeSelector)
    // const posts = useSelector(postsSelector)
    // const postsExplore = posts.explorePosts.posts
    // const limit = posts.explorePosts.limit

    const [fullPost, setFullPost] = useState(false)

    const position = useSelector(positionScrollSelector)
    useEffect(() => {
        window.scrollTo(0, position.explore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const handleAddLimit = () => {
    //     let condition = (+postsExplore.length < (+limit - 5))
    //     if (!condition) {
    //         dispatchAddLimitExplorePosts(+limit + 5)
    //     } else if (condition) {
    //         setFullPost(true)
    //     }
    // }

    // useEffect(() => {
    //     if(limit > 5) {
    //         dispatchGetExplorePosts(limit)
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [limit])

    return (
        <div className={`explore ${darkTheme ? 'explore-dark' : ''}`}>
        {/* {postsExplore && postsExplore.map(post => (
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
                countLike={post.countLike}
                countComment={post.countComment}
                liked={post.liked}
            />
        ))} */}
        <div className='explore-footer'>
            <Waypoint
                // onEnter={handleAddLimit}
            />
            {/* {
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
            } */}
        </div>
    </div>
    )
}

export default Explore