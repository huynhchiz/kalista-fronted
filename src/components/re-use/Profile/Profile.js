import './Profile.scss'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import ProfileContent from '../ProfileContent/ProfileContent'
import NavBack from '../NavBack/NavBack'
// import ModalList from '../ModalList/ModalList'

import { Waypoint } from 'react-waypoint'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { dispatchGetUser, dispatchGetUserPosts } from '../../../dispatchs/dispatchUser'
import { isFollowingUserSelector, userFollowersSelector, userFollowingsSelector, userInfoSelector, userPostsSelector } from '../../../redux/selectors/userSelector'

const Profile = () => {
    const [limit, setLimit] = useState(15)

    const [searchParam] = useSearchParams()
    const idParam = searchParam.get('user')

    const userInfo = useSelector(userInfoSelector)
    const userFollower = useSelector(userFollowersSelector)
    const userFollowing = useSelector(userFollowingsSelector)
    const userPost = useSelector(userPostsSelector)
    const isFollowingUser = useSelector(isFollowingUserSelector)
    const userPosts = useSelector(userPostsSelector)

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatchGetUser(idParam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddLimit = () => {
        let condition = (+(userPost.count) < +limit - 15)
        if (!condition) {
            setLimit(limit + 15)
        }
    }

    useEffect(() => {
        if(limit > 15) {
            dispatchGetUserPosts(idParam, 15)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className='profile'>
            <NavBack onGoBack={() => navigate(-1)} />

            {/* <ModalList /> */}

            <ProfileHeader
                following={isFollowingUser}
                email={userInfo && userInfo.email}
                userAvatar={userInfo && userInfo.avatar}
                username={userInfo && userInfo.username}
                userId={userInfo && userInfo.userId}
                countFollowers={userFollower && userFollower.count}
                countFollowings={userFollowing && userFollowing.count}
                countPosts={userPost && userPost.count}
            />

            <ProfileContent
                listPost={userPosts && userPosts.list}
            />

            <div className='profile-footer'>
                <Waypoint
                    onEnter={handleAddLimit}
                />
            </div>
        </div>
    )
}

export default Profile