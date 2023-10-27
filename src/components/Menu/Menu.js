import './Menu.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

const Menu = () => {
    const darkTheme = useSelector(themeSelector)

    const feedRef = useRef()
    const exploreRef = useRef()
    const postRef = useRef()
    const accountRef = useRef()
    
    const handleActiveMenuOption = (ref) => {
        let menuActive = document.querySelector('.menu-active')
        if (menuActive) {menuActive.classList.remove('menu-active')}
        ref.current.classList.add('menu-active')
    }

    return (
        <div className={`menu ${darkTheme && 'menu-dark'}`}>

            <div
                ref={feedRef}
                className='menu-feed'
                onClick={() => handleActiveMenuOption(feedRef)}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faHouse} />
                </p>
            </div>


            <div
                ref={exploreRef}
                className='menu-explore'
                onClick={() => handleActiveMenuOption(exploreRef)}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
            </div>


            <div
                ref={postRef}
                className='menu-post'
                onClick={() => handleActiveMenuOption(postRef)}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </p>
            </div>


            <div
                ref={accountRef}
                className='menu-account'
                onClick={() => handleActiveMenuOption(accountRef)}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faUser} />
                </p>
            </div>

        </div>
    )
}

export default Menu