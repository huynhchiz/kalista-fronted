import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'

import './Home.scss'
import Post from '../re-use/Post/Post'

import { themeSelector } from '../../redux/selectors/themeSelector'
import { positionScrollSelector } from '../../redux/selectors/postSelector'
import { homePostsSelector } from '../../redux/selectors/postSelector'
import { dispatchAddLimitHomePosts, dispatchGetHomePosts } from '../../dispatchs/dispatchPosts'

const Home = () => {
    const darkTheme = useSelector(themeSelector)
    
    const homePost = useSelector(homePostsSelector)
    const postsHome = homePost.list
    const limit = homePost.limit
    const position = useSelector(positionScrollSelector)

    const [fullPost, setFullPost] = useState(false) 

    const handleAddLimit = () => {
        let condition = (+postsHome.length < +limit - 5)
        if (!condition) {
            dispatchAddLimitHomePosts(+limit + 5)
        } else if (condition) {
            setFullPost(true)
        }
    }
    
    useEffect(() => {
        if(+limit > 5) {
            dispatchGetHomePosts(+limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    useEffect(() => {
        window.scrollTo(0, position.home)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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
                    userId={post.userId}
                    email={post.User.email}
                    avatar={post.User.avatar}
                    countLike={post.countLike}
                    countComment={post.countComment}
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
                    postsHome.length > 0 ?

                    <p className={darkTheme ? 'dark' : ''}
                    >Loading more posts...</p>

                    :
                    <p className={darkTheme ? 'dark' : ''}
                        onClick={() => {dispatchGetHomePosts(limit)}}>
                        Click to see more posts
                    </p>
                }
            </div>
        </div>
    )
}

export default Home