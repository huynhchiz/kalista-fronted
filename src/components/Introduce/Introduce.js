import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'

import './Introduce.scss'
import logoLight from '../../assets/images/navlogo-white.png'
import logoDark from '../../assets/images/navlogo-black.png'
import BigButton from '../re-use/BigButton/BigButton'

import { userLoginSelector } from '../../redux/selector'

const Introduce = () => {
    const navigate = useNavigate()

    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    useEffect(() => {
        if(userLogin && userLogin.isAuthenticated) {
            navigate('/welcome')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLogin])

    const redirectToLogin = () => {
        navigate('/login')
    }

    const redirectToRegister = () => {
        navigate('/register')
    }

    return (
        <div className='introduce'>
            <div className={`introduce-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='introduce-content'>
                    <div className='introduce-logo'>
                        <img className='introduce-logo-img' src={!darkTheme ? logoLight : logoDark} alt='_logo'/>
                    </div>
                    
                    <BigButton className={'go-to-login-btn'} onClick={redirectToLogin}>LOGIN</BigButton>
                    <BigButton onClick={redirectToRegister}>REGISTER</BigButton>
                    
                </div>
            </div>
        </div>
    )
}

export default Introduce