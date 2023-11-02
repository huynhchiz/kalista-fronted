import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './Nav.scss'
import ThemeToggle from '../re-use/ThemeToggle/ThemeToggle'
import navWhiteLogo from '../../assets/images/navlogo-white.png'
import navDarkLogo from '../../assets/images/navlogo-black.png'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import Setting from '../re-use/Setting/Setting'

const Nav = () => {
    const location = useLocation()
    const darkTheme = useSelector(themeSelector)
    const [showToggle, setShowToggle] = useState(false)

    useEffect(() => {
        if (location.pathname !== '/my-profile') {
            setShowToggle(true)
        } else {
            setShowToggle(false)
        }
    }, [location.pathname])

    return (
        <div className={`nav ${darkTheme && 'nav-dark'}`}>
            <div className='nav-logo'>
                <img className='nav-logo-img' src={darkTheme ? navDarkLogo : navWhiteLogo} alt='nav logo'/>
            </div>

            {showToggle ? <div className='nav-toggle'>
                <div className='toggle-wrapper'>
                    <ThemeToggle />
                </div>
            </div>
             :
            <div className='nav-setting'>
                <Setting />
            </div>}

            
        </div>
    )
}

export default Nav