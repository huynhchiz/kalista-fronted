import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logoLight from '../../assets/images/navlogo-white.png'
import logoDark from '../../assets/images/navlogo-black.png'
import './Welcome.scss'

import { dispatchGetAccount, dispatchGetUserAvt, dispatchLoadPage } from '../../dispatchFunctions/dispatchFunctions'
import { dispatchGetHomePosts, dispatchGetExplorePosts, dispatchGetUserPosts } from '../../dispatchFunctions/dispatchPosts'
import { themeSelector, userLoginSelector } from '../../redux/selector'
import { dispatchGetUserFollowing, dispatchGetUserFollower } from '../../dispatchFunctions/dispatchFollows'
import { dispatchResetScrollPosition } from '../../dispatchFunctions/dispatchScrollPosition'

const Welcome = () => {
    const darkTheme = useSelector(themeSelector)
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
            }, 1500)
        } else {
            navigate('/introduce')
        }
        dispatchLoadPage()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const animations = ['H','E','L','L','O','W','O','R','L','D']

    return (
        <div className="welcome">
            <img className='welcome-logo-img' src={darkTheme ? logoDark : logoLight} alt='_logo'/>
        </div>
    )
}

export default Welcome