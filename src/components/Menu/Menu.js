import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import './Menu.scss'

import { themeSelector, userLoginSelector } from '../../redux/selector'
import { dispatchSetScrollExplore, dispatchSetScrollHome, dispatchSetScrollMyProfile } from "../../dispatchFunctions/dispatchScrollPosition";

const Menu = () => {
    const userLogin = useSelector(userLoginSelector)
    const darkTheme = useSelector(themeSelector)

    const location = useLocation()

    const feedRef = useRef()
    const exploreRef = useRef()
    const postingRef = useRef()
    const accountRef = useRef()

    useEffect(() => {
        if (userLogin.isAuthenticated && location.pathname === '/') {
            let menuActive = document.querySelector('.menu-active')
            if (menuActive) { 
                menuActive.classList.remove('menu-active')
            }
            feedRef.current.classList.add('menu-active')
        }
    }, [location.pathname])
    
    const handleActiveMenuOption = (ref) => {
        let menuActive = document.querySelector('.menu-active')
        if (menuActive) { menuActive.classList.remove('menu-active') }

        ref.current.classList.add('menu-active')
    }

    const navigate = useNavigate()
    const handleNavigate = (path) => {
        navigate(path)
    }

    const handleChangeMenuOption = (ref, path) => {
        handleActiveMenuOption(ref);
        handleNavigate(path);
    }

    const handleSavePosition = () => {
        if(location.pathname === '/') {
            dispatchSetScrollHome(window.scrollY)
        }
        if(location.pathname === '/explore') {
            dispatchSetScrollExplore(window.scrollY)
        }
        if(location.pathname === '/my-profile') {
            dispatchSetScrollMyProfile(window.scrollY)
        }
    }

    return (
        userLogin && userLogin.isAuthenticated &&
        <div
            className={`menu ${darkTheme && 'menu-dark'}`}
            onClick={handleSavePosition}
        >
            <div
                ref={feedRef}
                className='menu-feed'
                onClick={() => handleChangeMenuOption(feedRef, '/')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faHouse} />
                </p>
            </div>

            <div
                ref={exploreRef}
                className='menu-explore'
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
                onClick={() => handleChangeMenuOption(accountRef, '/my-profile')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faUser} />
                </p>
            </div>

        </div>
    )
}

export default Menu