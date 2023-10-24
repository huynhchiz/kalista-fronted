import { useState } from 'react'
import './Introduce.scss'

const Introduce = () => {
    const [darkTheme, setDarkTheme] = useState(false)
    
    return (
        <div className='introduce'>
            <div className={`introduce-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                Introduce
            </div>
        </div>
    )
}

export default Introduce