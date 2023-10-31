import './ThemeToggle.scss'

import { useDispatch, useSelector } from 'react-redux'
import themeSlice from '../../../slices/themeSlice'
import { themeSelector } from '../../../redux/selector'

const ThemeToggle = () => {
    const dispatch = useDispatch()
    const darkTheme = useSelector(themeSelector)

    const handleToggleTheme = () => {
        dispatch(themeSlice.actions.toggleTheme())
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