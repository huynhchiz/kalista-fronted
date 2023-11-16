import './Menu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { themeSelector } from '../../redux/selectors/themeSelector'
import { dispatchSetScrollExplore, dispatchSetScrollHome, dispatchSetScrollMyProfile } from "../../dispatchs/dispatchScrollPosition";
import { accAuthSelector } from '../../redux/selectors/accountSelector'

const Menu = () => {
    const accountAuth = useSelector(accAuthSelector)
    const darkTheme = useSelector(themeSelector)

    const location = useLocation()

    const feedRef = useRef()
    const exploreRef = useRef()
    const postingRef = useRef()
    const accountRef = useRef()

    useEffect(() => {
        if (accountAuth && accountAuth.isAuth && location.pathname === '/') {
            let menuActive = document.querySelector('.menu-active')
            if (menuActive) { 
                menuActive.classList.remove('menu-active')
            }
            feedRef.current.classList.add('menu-active')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
    
    const handleActiveMenuOption = (ref) => {
        let menuActive = document.querySelector('.menu-active')
        if (menuActive) { menuActive.classList.remove('menu-active') }

        ref.current.classList.add('menu-active')
    }

    const navigate = useNavigate()

    const handleClickToPage = (ref, path) => {
        handleActiveMenuOption(ref)
        if(location.pathname === path) {
            window.scrollTo({top: 0, behavior: 'smooth'})
        } else {
            navigate(path)
        }
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
        accountAuth && accountAuth.isAuth && location.pathname !== '/welcome' &&
        <div
            className={`menu ${darkTheme ? 'menu-dark' : ''}`}
            onClick={handleSavePosition}
        >
            <div ref={feedRef}
                className='menu-feed'
                onClick={() => handleClickToPage(feedRef, '/')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faHouse} />
                </p>
            </div>

            <div ref={exploreRef}
                className='menu-explore'
                onClick={() => handleClickToPage(exploreRef, '/explore')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </p>
            </div>

            <div ref={postingRef}
                className='menu-post'
                onClick={() => handleClickToPage(postingRef, '/posting')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </p>
            </div>

            <div
                ref={accountRef}
                className='menu-account'
                onClick={() => handleClickToPage(accountRef, '/my-profile')}
            >
                <p className='menu-title'>
                    <FontAwesomeIcon icon={faUser} />
                </p>
            </div>

        </div>
    )
}

export default Menu