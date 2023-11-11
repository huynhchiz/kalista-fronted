import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Welcome.scss'
import { dispatchGetAccount, dispatchGetUserAvt, dispatchLoadPage } from '../../dispatchFunctions/dispatchFunctions'
import { dispatchGetHomePosts, dispatchGetExplorePosts, dispatchGetUserPosts } from '../../dispatchFunctions/dispatchPosts'
import { userLoginSelector } from '../../redux/selector'
import { dispatchGetUserFollowing, dispatchGetUserFollower } from '../../dispatchFunctions/dispatchFollows'
import { dispatchResetScrollPosition } from '../../dispatchFunctions/dispatchScrollPosition'

const Welcome = () => {
    const userLogin = useSelector(userLoginSelector)
    const navigate = useNavigate()

    useEffect(() => {
        dispatchLoadPage()
        if (userLogin && userLogin.isAuthenticated) {
            dispatchResetScrollPosition()
            
            dispatchGetAccount()
            dispatchGetUserAvt()

            dispatchGetHomePosts(5)
            dispatchGetExplorePosts(5)
            dispatchGetUserPosts(userLogin.account.email, 15)

            dispatchGetUserFollowing(userLogin.account.email, 2)
            dispatchGetUserFollower(userLogin.account.email, 2)

            setTimeout(() => {
                navigate('/')
            }, 3000)
        } else {
            navigate('/introduce')
        }
        dispatchLoadPage()
    }, [])

    const animations = ['H','E','L','L','O','W','O','R','L','D']

    return (
        <div className="welcome">
            <div className='welcome-animation'>
                {animations.length > 0 && animations.map((item, idx) => (
                    <h4 className={`welcome_${idx}`} key={idx}>
                        {item}
                    </h4>
                ))}
            </div>
        </div>
    )
}

export default Welcome