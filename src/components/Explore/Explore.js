import './Explore.scss'
import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { useSelector } from 'react-redux'

import Post from '../re-use/Post/Post'

import { getNotFollowingPosts } from '../../service/postService'
import { themeSelector, postsSelector } from '../../redux/selector'

const Explore = () => {
    const darkTheme = useSelector(themeSelector)
    const posts = useSelector(postsSelector)

    const [postsExplore, setPostsExplore] = useState(posts.explorePosts)
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

    const fetchAllPost = async () => {
        let res = await getNotFollowingPosts(limit)
        if (res && +res.EC === 0) {
            setPostsExplore(res.DT)
        }
    }

    useEffect(() => {
        if(limit > 0) {
            fetchAllPost()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className={`home ${darkTheme ? 'home-dark' : ''}`}>
        {postsExplore && postsExplore.map(post => (
            <Post
                key={post.id}
                src={post.src}
                type={post.type}
                alt={post.alt}
                caption={post.caption}
                date={post.date}
                username={post.User.username}
                email={post.User.email}
                avatar={post.User.avatar}
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
                <p className={darkTheme ? 'dark' : ''}
                    // onClick={fetchAllPost}
                >{
                    postsExplore.length > 0 ? 'Loading more posts...' : 'Click to see more posts'
                }</p>
            }
        </div>
    </div>
    )
}

export default Explore