import './ProfileContent.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'

const ProfileContent = ({ listPost }) => {
    const darkTheme = useSelector(themeSelector)

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
                            /> : post.type === 'video' &&
                            <video
                                key={post.id}
                                src={post.src}
                                alt={post.alt}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileContent