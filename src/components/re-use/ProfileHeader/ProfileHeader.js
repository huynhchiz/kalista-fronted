import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './ProfileHeader.scss'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'

import { themeSelector, userLoginSelector } from '../../../redux/selector'
import { followSV, unfollowSV } from '../../../service/followService'
import { dispatchGetUserFollowing } from '../../../dispatchFunctions/dispatchFollows'
import { dispatchFetchOtherUserFollowers } from '../../../dispatchFunctions/dispatchOtherUser'

const ProfileHeader = ({ following = false, email, userAvatar, username, countFollowers, countFollowings, countPosts }) => {
    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    const handleFollow = async () => {
        let res = await followSV(email)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUserFollowing(userLogin.account.email, 2)
            dispatchFetchOtherUserFollowers(email)
        }
    }
    const handleUnfollow = async () => {
        let res = await unfollowSV(email)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUserFollowing(userLogin.account.email, 2)
            dispatchFetchOtherUserFollowers(email)
        }
    }

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

            {
                email === userLogin.account.email ? <></> : 
                <>
                    {following ?
                        <div className='profile-followed'>
                            <button className='profile-following-btn'
                                    onClick={handleUnfollow}
                            >
                                Following
                                <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                            </button>
                        </div> : 
                        
                        <div className='profile-not-following-yet'>
                            <button className='profile-follow-btn'
                                onClick={handleFollow}
                            >
                                Follow
                            </button>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default ProfileHeader