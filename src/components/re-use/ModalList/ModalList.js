import './ModalList.scss'

import avatarUnset  from '../../../assets/images/user-avatar-unset.png'

const ModalList = () => {
    return(
        <div className='modal-list-wrapper'>
            <div className='modal-list'>
                
                <div className='modal-list-header'>
                    <p className='title'>
                        Followings
                    </p>
                </div>

                <div className='modal-list-content'>
                    <div className='item'>
                        <div className='image-wrapper'>
                            <img src={avatarUnset} alt='_avatar' />
                            <p className='username'>
                                developer
                            </p>
                            <div className='action'>
                                ...
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='modal-list-footer'>
        
                </div>
            </div>
        </div>
    )
}

export default ModalList