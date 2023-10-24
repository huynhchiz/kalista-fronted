import { useEffect, useState } from 'react'
import './ThemeToggle.scss'

const ThemeToggle = () => {
    const [darkToggle, setDarkToggle] = useState(false)

    const handleToggle = () => {
        setDarkToggle(!darkToggle)
    }

    return (
        <div className='theme-toggle' onClick={handleToggle}>
            <div className={!darkToggle ? 'toggle-button-light' : 'toggle-button-dark'} >
                <div className={!darkToggle ? 'select-button-light': 'select-button-dark'}></div>
            </div>
        </div>
    )
}

export default ThemeToggle