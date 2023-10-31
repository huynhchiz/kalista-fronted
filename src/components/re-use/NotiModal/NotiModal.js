import './NotiModal.scss'

import { useSelector } from 'react-redux'
import { themeSelector, notiModalMessageSelector } from '../../../redux/selector'

const NotiModal = ({ top = false }) => {
    const darkTheme = useSelector(themeSelector)
    const messageNoti = useSelector(notiModalMessageSelector)
    
    return (
        <div className={`noti-modal ${darkTheme ? "noti-modal-dark" : ''} ${top ? 'noti-modal-upper' : ''}`}>
            <div className='noti-modal-content'>
                <p>
                    {messageNoti}
                </p>
            </div>
        </div>
    )
}

export default NotiModal