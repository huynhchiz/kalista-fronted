import './ProfileHeader.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'


const ProfileHeader = ({ userAvatar, username, countFollowers, countFollowings, countPosts }) => {
    const darkTheme = useSelector(themeSelector)

    return (
        <div className={`profile-header ${darkTheme ? 'profile-header-dark' : ''}`}>

            <div className='profile-avatar'>
                <img
                    src={userAvatar ? userAvatar : userAvatarUnset}
                    alt={'_avatar'}
                />
            </div>

            <div className='profile-info'>
                <h3>{username ? username : 'unname'}</h3>

                <div className='info-follow'>
                    <p>{countFollowers || '0'} followers</p>
                    <p>following {countFollowings || '0'}</p>
                </div>

                <p>
                    {countPosts
                        ?
                    (countPosts >=2) ? (countPosts + ' posts') : (countPosts + ' post')
                        :
                    '0 post'}
                </p>
            </div>
            
        </div>
    )
}

export default ProfileHeader