import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'

import './Setting.scss'
import BigButton from '../BigButton/BigButton'
import { themeSelector } from '../../../redux/selector'
import userLoginSlice from '../../../slices/userLoginSlice'
import notiModalSlice from '../../../slices/notiModalSlice'
import { logoutUserService } from '../../../service/signService'

const Setting = () => {
    const dispatch = useDispatch()
    const darkTheme = useSelector(themeSelector)
    const [showSetting, setShowSetting] = useState(false)

    const handleLogout = async () => {
        let res = await logoutUserService()
        if(res && +res.EC === 0) {
            dispatch(notiModalSlice.actions.setShow())
            dispatch(notiModalSlice.actions.setMessage('Log out success!'))
            dispatch(userLoginSlice.actions.logoutUser())
        }
    }

    return (
        <div className={`setting ${darkTheme ? 'setting-dark' : ''}`}>
            {!showSetting ? 
                <div className='setting-toggle' onClick={() => setShowSetting(true)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                :

                <div className='setting-content'>
                    <div className='setting-content-header'>
                        <div
                            className='back-setting'
                            onClick={() => setShowSetting(false)}    
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
            }
        </div>
    )
}

export default Setting