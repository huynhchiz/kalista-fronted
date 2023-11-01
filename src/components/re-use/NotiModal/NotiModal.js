import './NotiModal.scss'

import { useSelector, useDispatch } from 'react-redux'
import { themeSelector, notiModalMessageSelector, notiModalShowSelector } from '../../../redux/selector'
import notiModalSlice from '../../../slices/notiModalSlice'

const NotiModal = ({ top = false }) => {
    const dispatch = useDispatch()
    const darkTheme = useSelector(themeSelector)
    const messageNoti = useSelector(notiModalMessageSelector)
    const show = useSelector(notiModalShowSelector)

    const handleClose = () => {
        dispatch(notiModalSlice.actions.setShow())
    }
    
    return (
        show &&
        <div 
            onClick={handleClose}
            className={`noti-modal ${darkTheme ? "noti-modal-dark" : ''} ${top ? 'noti-modal-upper' : ''}`}
        >
            <div className='noti-modal-content'>
                <p>
                    {messageNoti}
                </p>
            </div>
        </div>
    )
}

export default NotiModal