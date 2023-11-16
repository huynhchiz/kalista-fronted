import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './Nav.scss'
import ThemeToggle from '../re-use/ThemeToggle/ThemeToggle'
import navWhiteLogo from '../../assets/images/navlogo-white.png'
import navDarkLogo from '../../assets/images/navlogo-black.png'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import Setting from '../re-use/Setting/Setting'
import { dispatchSetError } from '../../dispatchs/dispatchError'

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
        dispatchSetError(false)
        navigate('/welcome')
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
            
            
            
        </div>
    )
}

export default Nav