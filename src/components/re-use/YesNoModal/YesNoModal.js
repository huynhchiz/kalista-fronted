import { useSelector } from 'react-redux'

import './YesNoModal.scss'
import BigButton from '../BigButton/BigButton'
import { themeSelector } from '../../../redux/selector'

const YesNoModal = ({ title, show, onClickYes, onClickCancel }) => {
    const darkTheme = useSelector(themeSelector)

    const onClickContent = e => {
        e.stopPropagation()
    }

    return (
        show &&
        <div className={`yesno-modal ${darkTheme ? 'yesno-modal-dark' : ''}`} onClick={onClickCancel}>
            <div className='yesno-modal-content' onClick={onClickContent}>
                <div className='yesno-title'>
                    <p>{title}</p>
                </div>

                <div className='yesno-buttons'>
                    <BigButton className={'yes-btn'} onClick={onClickYes}>YES</BigButton>

                    <BigButton className={'no-btn'} onClick={onClickCancel}>CANCEL</BigButton>

                </div>
            </div>
        </div>
    )
}

export default YesNoModal