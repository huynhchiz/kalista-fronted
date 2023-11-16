import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import logoLight from '../../assets/images/navlogo-white.png'
import logoDark from '../../assets/images/navlogo-black.png'
import './Welcome.scss'

import { themeSelector } from '../../redux/selectors/themeSelector'
import { accAuthSelector } from '../../redux/selectors/accountSelector'

const Welcome = () => {
    const darkTheme = useSelector(themeSelector)
    const accountAuth = useSelector(accAuthSelector)

    const navigate = useNavigate()

    useEffect(() => {
        if (accountAuth && accountAuth.isAuth) {
            setTimeout(() => {
                navigate('/')
            }, 1500)
        } else {
            navigate('/introduce')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="welcome">
            <img className='welcome-logo-img' src={darkTheme ? logoDark : logoLight} alt='_logo'/>
        </div>
    )
}

export default Welcome