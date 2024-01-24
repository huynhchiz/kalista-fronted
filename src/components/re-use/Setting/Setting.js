import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './Setting.scss'
import BigButton from '../BigButton/BigButton'
import { themeSelector } from '../../../redux/selectors/themeSelector'
import { logoutUserService } from '../../../service/signService'
import { dispatchLogout } from '../../../dispatchs/dispatchAccount'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const darkTheme = useSelector(themeSelector)
    const [show, setShow] = useState(false)
    const contentRef = useRef()
    const navigate = useNavigate()

    const toggleSetting = () => {
        if(show) {
            contentRef.current.style = 'top: -120%'
            setShow(false)
        } else {
            contentRef.current.style = 'top: 0'
            setShow(true)
        }
    }
    
    const handleLogout = async () => {
        let res = await logoutUserService()
        if(res && +res.EC === 0) {
            dispatchLogout()
        }
    }

    const handleToEditInfo = () => {
        toggleSetting()
        navigate('/edit-information')
    }

    return (
        <div className={`setting ${darkTheme ? 'setting-dark' : ''}`}>
            <div
                className='setting-toggle'
                onClick={toggleSetting}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>

            {
                // show ?
                <div className='setting-content' ref={contentRef}>
                    <div className='setting-content-header'>
                        {/*  */}
                    </div>

                    <div className='setting-content-main'>
                        <div className='setting-main-item'>
                            <div className='setting-item-button' onClick={handleToEditInfo}>
                                Change your information
                            </div>
                        </div>
                        <div className='setting-main-item'>
                            <div className='setting-item-button' onClick={handleToEditInfo}>
                                Change your password
                            </div>
                        </div>
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
                            onClick={toggleSetting}
                        >
                            OK
                        </BigButton>
                    </div>
                </div> 
                // : <></>
            }
            
        </div>
    )
}

export default Setting