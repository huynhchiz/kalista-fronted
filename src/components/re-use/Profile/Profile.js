import './Profile.scss'

import { useEffect, useState } from 'react'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import ProfileContent from '../ProfileContent/ProfileContent'

const Profile = () => {

    const [limit, setLimit] = useState(15)


    const handleAddLimit = () => {
        let condition = (+listPost.length < +limit - 15)
        if (!condition) {
            setLimit(limit + 15)
        }
    }

    useEffect(() => {
        if(limit > 15) {
            // dispatchGetUserPosts(userLogin.account.email, limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className='profile'>
            <ProfileHeader />

            <ProfileContent listPost={[]} />

            <div className='profile-footer'>
                <Waypoint
                    onEnter={handleAddLimit}
                />
            </div>
        </div>
    )
}

export default Profile