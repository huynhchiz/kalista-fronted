import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import './Nav.scss'
import ThemeToggle from '../re-use/ThemeToggle/ThemeToggle'
import Setting from '../re-use/Setting/Setting'
import navWhiteLogo from '../../assets/images/navlogo-white.png'
import navDarkLogo from '../../assets/images/navlogo-black.png'

import { themeSelector } from '../../redux/selectors/themeSelector'
import { dispatchSetError } from '../../dispatchs/dispatchPageAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

const Nav = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const darkTheme = useSelector(themeSelector)

    const [showToggle, setShowToggle] = useState(false)

    useEffect(() => {
        if (location.pathname !== '/my-profile') {
            setShowToggle(true)
        } else {
            setShowToggle(false)
        }
    }, [location.pathname])

    const handleCLickLogo = () => {
        if(location.pathname === '/chat-boxs') {
            navigate('/')
            return;
        }
        dispatchSetError(false)
        navigate('/welcome')
    }

    const handleGoToChatBoxs = () => {
        navigate('/chat-boxs')
    }

    return (
        <div className={`nav ${darkTheme ? 'nav-dark' : ''}`}>
            {
                location.pathname === '/welcome' ? <></> :
                <div className='nav-logo' onClick={handleCLickLogo}>
                    <img className='nav-logo-img' src={darkTheme ? navDarkLogo : navWhiteLogo} alt='nav logo'/>
                </div>
            }

            {showToggle ? 
                <div className='nav-toggle'>
                    <div className='toggle-wrapper'>
                        <ThemeToggle />
                    </div>
                </div>
                :
                <Setting />
            }

            {
                location?.pathname === '/my-profile' &&
                <div className='nav-message'>
                    <FontAwesomeIcon icon={faMessage} className='nav-message-icon' onClick={handleGoToChatBoxs}/>
                </div>
            }
            
            
            
        </div>
    )
}

export default Nav