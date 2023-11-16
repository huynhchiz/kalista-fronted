import './ModalList.scss'

import avatarUnset  from '../../../assets/images/user-avatar-unset.png'

const ModalList = ({ list, title = 'list', footer, onClose }) => {

    console.log(list);

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
                            <div className='item' key={'key_' + item.id}>
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