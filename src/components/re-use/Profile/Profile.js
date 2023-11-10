import './Profile.scss'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import ProfileContent from '../ProfileContent/ProfileContent'

import { Waypoint } from 'react-waypoint'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { followSelector, otherUserSelector, userLoginSelector } from '../../../redux/selector'
import { dispatchFetchOtherUserInFo,
    dispatchFetchOtherUserPosts,
    dispatchFetchOtherUserFollowers,
    dispatchFetchOtherUserFollowings } from "../../../dispatchFunctions/dispatchOtherUser"

const Profile = () => {
    const [limit, setLimit] = useState(15)
    const [following, setFollowing] = useState(false)

    const [searchParam, setSearchParam] = useSearchParams()
    const emailPr = searchParam.get('user')

    const navigate = useNavigate()

    const userLogin = useSelector(userLoginSelector)
    const otherUser = useSelector(otherUserSelector)
    const userLoginFollow = useSelector(followSelector)
    
    useEffect(() => {
        dispatchFetchOtherUserInFo(emailPr)
        dispatchFetchOtherUserPosts(emailPr, limit)
        dispatchFetchOtherUserFollowers(emailPr)
        dispatchFetchOtherUserFollowings(emailPr)
    }, [emailPr])

    // did not work
    useEffect(() => {
        if(emailPr === userLogin.account.email) {
            navigate('/my-profile')
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])    
    
    useEffect(() => {
        let isFollowing = 
            userLoginFollow.followings.list.length > 0 &&
            userLoginFollow.followings.list.some(item => (
                item.email === emailPr
            ))
        if(isFollowing) {
            setFollowing(true)
        }

        if(!isFollowing) {
            setFollowing(false)
        }

    }, [userLoginFollow])


    const handleAddLimit = () => {
        let condition = (+(otherUser.posts.posts.length) < +limit - 15)
        if (!condition) {
            setLimit(limit + 15)
        }
    }

    useEffect(() => {
        if(limit > 15) {
            dispatchFetchOtherUserPosts(emailPr, limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className='profile'>
            <ProfileHeader
                following={following}
                email={emailPr}
                userAvatar={otherUser.info.avatar}
                username={otherUser.info.username}
                countFollowers={otherUser.followers.countFollower}
                countFollowings={otherUser.followings.countFollowing}
                countPosts={otherUser.posts.count}
            />

            <ProfileContent
                listPost={otherUser.posts.posts}
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