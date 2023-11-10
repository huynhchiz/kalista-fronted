import './ProfileContent.scss'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { themeSelector } from '../../../redux/selector'

const ProfileContent = ({ listPost }) => {
    const darkTheme = useSelector(themeSelector)

    const navigate = useNavigate()

    const handlePreviewPost = (postId) => {
        navigate(`/preview?post=${postId}`)
    }

    return (
        <div className={`profile-content ${darkTheme ? 'profile-content-dark' : ''}`}>
            <div className='profile-post'>
                <div className='profile-post-frame'>
                    {listPost.length > 0 && 
                        listPost.map(post => (
                            post.type === 'image' ?
                            <img
                                key={post.id}
                                src={post.src}
                                alt={post.alt}
                                onClick={() => handlePreviewPost(post.id)}
                            /> : post.type === 'video' &&
                            <video
                                key={post.id}
                                src={post.src}
                                alt={post.alt}
                                onClick={() => handlePreviewPost(post.id)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileContent