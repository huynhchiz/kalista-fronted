import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'

import './Home.scss'
import Post from '../re-use/Post/Post'

import { getFollowingPosts } from '../../service/postService'
import { themeSelector,  postsSelector } from '../../redux/selector'

const Home = () => {
    const darkTheme = useSelector(themeSelector)
    const posts = useSelector(postsSelector)

    const [postsHome, setPostsHome] = useState(posts.homePosts)
    const [limit, setLimit] = useState(5)
    const [fullPost, setFullPost] = useState(false)

    const handleAddLimit = () => {
        let condition = (+postsHome.length < +limit - 5)
        if (!condition) {
            setLimit(limit => limit + 5)
        } else if (condition) {
            setFullPost(true)
        }
    }

    const fetchAllPost = async () => {
        let res = await getFollowingPosts(limit)
        if (res && +res.EC === 0) {
            setPostsHome(res.DT)
        }
    }

    useEffect(() => {
        if(limit > 5) {
            fetchAllPost()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])


    return (
        <div className={`home ${darkTheme ? 'home-dark' : ''}`}>
            {postsHome && postsHome.map(post => (
                <Post
                    key={'home' + post.id}
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
                    <p className={darkTheme ? 'dark' : ''}
                        onClick={fetchAllPost}
                    >{
                        postsHome.length > 0 ? 'Loading more posts...' : 'Click to see more posts'
                    }</p>
                }
            </div>
        </div>
    )
}

export default Home