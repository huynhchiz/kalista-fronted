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
import NavBack from '../NavBack/NavBack'
import ModalList from '../ModalList/ModalList'
import { dispatchGetAccount } from '../../../dispatchFunctions/dispatchFunctions'

const Profile = () => {
    const [limit, setLimit] = useState(15)
    const [following, setFollowing] = useState(false)

    const [searchParam] = useSearchParams()
    const emailPr = searchParam.get('user')

    const otherUser = useSelector(otherUserSelector)
    const userLoginFollow = useSelector(followSelector)
    const userLogin = useSelector(userLoginSelector)

    const navigate = useNavigate()

    console.log(userLogin);
    
    useEffect(() => {
        dispatchGetAccount()
        dispatchFetchOtherUserInFo(emailPr)
        dispatchFetchOtherUserPosts(emailPr, limit)
        dispatchFetchOtherUserFollowers(emailPr)
        dispatchFetchOtherUserFollowings(emailPr)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailPr])


    useEffect(() => {
        window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        const isFollowing = 
            userLogin.followings.length > 0 &&
            userLogin.followings.some(item => (
                item.email === emailPr
            ))
        if(isFollowing) {
            setFollowing(true)
        }

        if(isFollowing === false) {
            setFollowing(false)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
            <NavBack onGoBack={() => navigate(-1)} />

            {/* <ModalList /> */}

            <ProfileHeader
                following={ userLogin.followings.length > 0 &&
                            userLogin.followings.some(item => (
                            item.email === emailPr
                        ))}
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