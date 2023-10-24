import { useState } from 'react'
import './Introduce.scss'

import logoLight from '../../assets/images/navlogo-white.png'
import logoDark from '../../assets/images/navlogo-black.png'

const Introduce = () => {
    const [darkTheme, setDarkTheme] = useState(true)
    
    return (
        <div className='introduce'>
            <div className={`introduce-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='introduce-content'>
                    <div className='introduce-logo'>
                        <img className='introduce-logo-img' src={!darkTheme ? logoLight : logoDark} />
                    </div>

                    <button className={`login-button ${darkTheme && 'button-dark'}`}>LOGIN</button>
                    <button className={`register-button ${darkTheme && 'button-dark'}`}>REGISTER</button>

                </div>
            </div>
        </div>
    )
}

export default Introduce