import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'

import './Setting.scss'
import BigButton from '../BigButton/BigButton'
import { themeSelector } from '../../../redux/selector'
import { logoutUserService } from '../../../service/signService'

import { dispatchLogout } from '../../../dispatchFunctions/dispatchFunctions'

const Setting = () => {
    const darkTheme = useSelector(themeSelector)
    const settingContentRef = useRef()

    const openSetting = () => {
        settingContentRef.current.style.animation = 'slides ease-in 0.2s forwards'
    }

    const hideSetting = () => {
        settingContentRef.current.style.animation = 'hides ease-in 0.2s forwards'
    }
    
    const handleLogout = async () => {
        let res = await logoutUserService()
        if(res && +res.EC === 0) {
            dispatchLogout()
        }
    }

    return (
        <div className={`setting ${darkTheme ? 'setting-dark' : ''}`}>
            <div
                className='setting-toggle'
                onClick={openSetting}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className='setting-content' ref={settingContentRef}>
                <div className='setting-content-header'>
                    <div
                        className='back-setting'
                        onClick={hideSetting}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </div>

                <div className='setting-content-main'>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>Setting ...</div>
                    <div className='setting-main-item'>
                        <BigButton
                            className={'logout-btn'}
                            onClick={handleLogout}
                        >
                            LOG OUT
                        </BigButton>
                    </div>
                </div>

                <div className='setting-content-footer'>
                    <BigButton
                        className={'done-setting-btn'}
                    >
                        OK
                    </BigButton>
                </div>
            </div>
        </div>
    )
}

export default Setting