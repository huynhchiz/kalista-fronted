import './ProfilePosts.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'

const ProfilePosts = () => {
    const darkTheme = useSelector(themeSelector)

    return (
        <div className={`profile-post ${darkTheme ? 'profile-post-dark' : ''}`}>
            <div className='profile-post-frame'>
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                <img className='img-first' src='http://res.cloudinary.com/drk6juqrs/image/upload/v1698939175/fzouoeobyzcnotkrnl16.jpg' />
                

            </div>
        </div>
    )
}

export default ProfilePosts