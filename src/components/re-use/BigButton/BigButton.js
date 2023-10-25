import './BigButton.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'

const BigButton = ({className, children, onClick}) => {
    const darkTheme = useSelector(themeSelector)

    return (
        <button className={`big-button ${className} ${darkTheme && 'dark-button'}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default BigButton