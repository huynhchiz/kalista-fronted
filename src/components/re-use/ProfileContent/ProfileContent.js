import './ProfileContent.scss'
import Post from '../Post/Post'
import NavBack from '../NavBack/NavBack'

import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { themeSelector } from '../../../redux/selectors/themeSelector'

const ProfileContent = ({ listPost }) => {
    const darkTheme = useSelector(themeSelector)

    const [showPost, setShowPost] = useState(false)
    
    const handleShowPost = (className) => {
        setShowPost(true)
        
        setTimeout(() => {
            const selectedPost = document.querySelector(className)
            selectedPost.scrollIntoView()
            window.scrollBy(0, -140);
        }, 1)
    }

    const navigate = useNavigate()
    const handleGoBack = () => {
        if (showPost) {
            setShowPost(false)
            window.scrollTo(0, 0)
        } else {
            navigate(-1)
        }
    }

    return (
        <>  
            <NavBack onGoBack={handleGoBack} />

            {!showPost ?
            <div className={`profile-content ${darkTheme ? 'profile-content-dark' : ''}`}>
                <div className='profile-post'>
                    <div className='profile-post-frame'>
                        {listPost && listPost.length > 0 && 
                            listPost.map(post => (
                                post.type === 'image' ?
                                <img
                                    key={post.id}
                                    src={post.src}
                                    alt={post.alt}
                                    onClick={() => handleShowPost('.post'+post.id)}
                                /> : post.type === 'video' &&
                                <video
                                    key={post.id}
                                    src={post.src}
                                    alt={post.alt}
                                    onClick={() => handleShowPost('.post'+post.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            :

            <div className='show-posts-content'>
                {listPost && listPost.length > 0
                    && listPost.map(post => (
                        <Post
                            className={'post'+post.id}
                            key={'content' + post.id}
                            postId={post.id}
                            src={post.src}
                            type={post.type}
                            alt={post.alt}
                            caption={post.caption}
                            date={post.date}
                            username={post.User.username}
                            userId={post.User.id}
                            email={post.User.email}
                            avatar={post.User.avatar}
                            countLike={post.countLike}
                            countComment={post.countComment}
                            liked={post.liked}
                            showUserInfo={false}
                        />
                    ))
                }
            </div>
            }
        </>


        

    )
}

export default ProfileContent