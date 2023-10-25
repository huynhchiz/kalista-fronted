import { useState } from 'react'

import './Nav.scss'
import ThemeToggle from '../re-use/ThemeToggle/ThemeToggle'
import navWhiteLogo from '../../assets/images/navlogo-white.png'
import navDarkLogo from '../../assets/images/navlogo-black.png'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'

const Nav = () => {
    const darkTheme = useSelector(themeSelector)
    const [logged, setLogged] = useState(false)

    return (
        <div className={`nav ${darkTheme && 'nav-dark'}`}>
            <div className='nav-logo'>
                <img className='nav-logo-img' src={darkTheme ? navDarkLogo : navWhiteLogo} alt='nav logo'/>
            </div>

            {!logged ? <div className='nav-introduce'>
                <div className='toggle-wrapper'>
                    <ThemeToggle />
                </div>
            </div>
             :
            <div className='nav-content'>

            </div>}

            
        </div>
    )
}

export default Nav