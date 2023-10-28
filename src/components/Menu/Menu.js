import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { themeSelector, userLoginSelector } from '../../redux/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'

import './Menu.scss'

const Menu = () => {
    const userLogin = useSelector(userLoginSelector)
    const darkTheme = useSelector(themeSelector)

    const feedRef = useRef()
    const exploreRef = useRef()
    const postingRef = useRef()
    const accountRef = useRef()
    
    const handleActiveMenuOption = (ref) => {
        let menuActive = document.querySelector('.menu-active')
        if (menuActive) { menuActive.classList.remove('menu-active') }
        let menuNext = document.querySelector('.menu-next')
        if (menuNext) { menuNext.classList.remove('menu-next') }
        let menuPrev = document.querySelector('.menu-prev')
        if (menuPrev) { menuPrev.classList.remove('menu-prev') }

        ref.current.classList.add('menu-active')
        if (ref === feedRef) { exploreRef.current.classList.add('menu-next') }
        if (ref === exploreRef) { feedRef.current.classList.add('menu-prev') }
        if (ref === exploreRef) { postingRef.current.classList.add('menu-next') }
        if (ref === postingRef) { exploreRef.current.classList.add('menu-prev') }
        if (ref === postingRef) { accountRef.current.classList.add('menu-next') }
        if (ref === accountRef) { postingRef.current.classList.add('menu-prev') }
    }

    const navigate = useNavigate()
    const handleNavigate = (path) => {
        navigate(path)
    }

    const handleChangeMenuOption = (ref, path) => {
        handleActiveMenuOption(ref);
        handleNavigate(path);
    }

    return (
        userLogin && userLogin.isAuthenticated &&
        <div className={`menu ${darkTheme && 'menu-dark'}`}>
            <div
                ref={feedRef}
                className='menu-feed menu-active'
                onClick={() => handleChangeMenuOption(feedRef, '/')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faHouse} />
                </p>
            </div>

            <div
                ref={exploreRef}
                className='menu-explore menu-next'
                onClick={() => handleChangeMenuOption(exploreRef, '/explore')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
            </div>

            <div
                ref={postingRef}
                className='menu-post'
                onClick={() => handleChangeMenuOption(postingRef, '/posting')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </p>
            </div>

            <div
                ref={accountRef}
                className='menu-account'
                onClick={() => handleChangeMenuOption(accountRef, '/account')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faUser} />
                </p>
            </div>

        </div>
    )
}

export default Menu