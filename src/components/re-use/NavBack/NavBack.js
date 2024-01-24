import './NavBack.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selectors/themeSelector'

const NavBack = ({ onGoBack }) => {
    const darkTheme = useSelector(themeSelector)

    return (
        <div className={`nav-back ${darkTheme ? 'nav-back-dark' : ''}`}>
            <FontAwesomeIcon 
                icon={faAngleLeft}
                className='nav-back-icon'
                onClick={onGoBack}
            />
        </div>
    )
}

export default NavBack