import {  useSelector } from 'react-redux'
import './ThemeToggle.scss'

import { themeSelector } from '../../../redux/selectors/themeSelector'
import { dispatchToggleTheme } from '../../../dispatchs/dispatchPageAction'

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