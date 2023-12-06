import { useSelector } from 'react-redux'
import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import userAvatarUnset from '../../../assets/images/user-avatar-unset.png'
import './ProfileHeader.scss'
import ModalList from '../ModalList/ModalList'

import { followSV, unfollowSV } from '../../../service/accountService'
import { themeSelector } from '../../../redux/selectors/themeSelector'
import { accInfoSelector } from '../../../redux/selectors/accountSelector'
import { dispatchGetUser, dispatchGetUserFollowers, dispatchGetUserFollowings } from '../../../dispatchs/dispatchUser'
import { userFollowersSelector, userFollowingsSelector } from '../../../redux/selectors/userSelector'


const ProfileHeader = ({ following, userAvatar, username, userId, countFollowers, countFollowings, countPosts }) => {
    const darkTheme = useSelector(themeSelector)
    const accountInfo = useSelector(accInfoSelector)
    
    const userFollowers = useSelector(userFollowersSelector)
    const userFollowings = useSelector(userFollowingsSelector)

    const [showFollower, setShowFollower] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const handleFollow = async () => {
        let res = await followSV(userId)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUser(userId)
        }
    }
    const handleUnfollow = async () => {
        let res = await unfollowSV(userId)
        if(res && +res.EC === 0) {
            console.log(res.EM);
            dispatchGetUser(userId)
        }
    }
    
    const handleShowFollower = () => {
        dispatchGetUserFollowers(userId, 10)
        setShowFollower(true)
    }

    const handleShowFollowing = () => {
        dispatchGetUserFollowings(userId, 10)
        setShowFollowing(true)
    }

    return (
        <>
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
                        <div className='count-follower' onClick={handleShowFollower}>
                            <p>followers</p><span>{countFollowers || '0'}</span>
                        </div>
                        <div className='count-following' onClick={handleShowFollowing}>
                            <p>following</p><span>{countFollowings || '0'}</span>
                        </div>
                    </div>
                    
                    <div className='count-post'>
                        { countPosts >= 2 && (<>
                                <span>{countPosts}</span>
                                <p>posts</p>
                            </>)
                        }
                        { countPosts === 1 && (<>
                                <span>{countPosts}</span>
                                <p>post</p>
                            </>)
                        }
                        { (!countPosts || countPosts === 0) && (<>
                                <span>0</span>
                                <p>post</p>
                            </>)
                        }
                    </div>

                </div>

                {
                    +userId === +accountInfo.userId ? <></> : 
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
        
                {
                    showFollower &&
                    <ModalList
                        title='Followers'
                        list={userFollowers.list}
                        onClose={() => setShowFollower(false)}
                    />
                }

                {
                    showFollowing &&
                    <ModalList
                        title='Followings'
                        list={userFollowings.list}
                        onClose={() => setShowFollowing(false)}
                    />
                }
        </>
        
    )
}

export default ProfileHeader