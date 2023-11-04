import './Home.scss'

import Post from '../re-use/Post/Post'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/postService'

const Home = () => {
    const [posts, setPosts] = useState([])
    const fetchAllPost = async () => {
        let res = await getAllPosts()
        if (res && +res.EC === 0) {
            setPosts(res.DT)
        }
    }

    useEffect(() => {
        fetchAllPost()
    }, [])

    return (
        <div className='home'>
            {posts && posts.map(post => (
                <Post
                    key={post.id}
                    src={post.src}
                    type={post.type}
                    alt={post.alt}
                    caption={post.caption}
                    date={post.date}
                    username={post.User.username}
                    avatar={post.User.avatar}
                />
            ))}
        </div>
    )
}

export default Home