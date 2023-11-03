import {  useSelector } from 'react-redux'
import './ThemeToggle.scss'

import { themeSelector } from '../../../redux/selector'
import { dispatchToggleTheme } from '../../../dispatchFunctions/dispatchFunctions'

const ThemeToggle = () => {
    const darkTheme = useSelector(themeSelector)

    const handleToggleTheme = () => {
        dispatchToggleTheme()
    }

    return (
        <div className='theme-toggle' onClick={handleToggleTheme}>
            <div className={!darkTheme ? 'toggle-button-light' : 'toggle-button-dark'} >
                <div className={!darkTheme ? 'select-button-light': 'select-button-dark'}></div>
            </div>
        </div>
    )
}

export default ThemeToggle