import './ModalList.scss'

import avatarUnset  from '../../../assets/images/user-avatar-unset.png'
import { useNavigate } from 'react-router-dom'

const ModalList = ({ list, title = 'list', footer, onClose }) => {
    const navigate = useNavigate()
    const handleNavigateToProfile = (userId) => {
        navigate(`/profile?user=${userId}`)
        onClose()
    }

    return(
        <div className='modal-list-wrapper' onClick={onClose}>
            <div className='modal-list' onClick={e => e.stopPropagation()}>
                
                <div className='modal-list-header'>
                    <p className='title'>
                        {title}
                    </p>
                </div>

                <div className='modal-list-content'>
                    {
                        list && 
                        list.map(item => (
                            <div className='item' key={'key_' + item.id} onClick={() => handleNavigateToProfile(item.id)}>
                                <img src={item.avatar ? item.avatar : avatarUnset} alt='_avatar' />
                                <p className='username'>
                                    {item.username}
                                </p>
                                <div className='action'>
                                    ...
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <div className='modal-list-footer'>
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default ModalList