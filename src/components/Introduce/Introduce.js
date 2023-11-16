import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import { accAuthSelector } from '../../redux/selectors/accountSelector'

import './Introduce.scss'
import logoLight from '../../assets/images/navlogo-white.png'
import logoDark from '../../assets/images/navlogo-black.png'
import BigButton from '../re-use/BigButton/BigButton'

const Introduce = () => {
    const navigate = useNavigate()

    const darkTheme = useSelector(themeSelector)
    const accountAuth = useSelector(accAuthSelector)

    useEffect(() => {
        if(accountAuth && accountAuth.isAuth) {
            navigate('/welcome')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountAuth])

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