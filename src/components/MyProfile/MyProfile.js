import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './MyProfile.scss'
import YesNoModal from '../re-use/YesNoModal/YesNoModal'

import { themeSelector, userLoginSelector, userLoginAvtSelector } from '../../redux/selector'
import { uploadImageCloudinary } from '../../service/imageService'
import { deleteUserAvatar, uploadAvatar } from '../../service/userService'
import { dispatchGetUserAvt, dispatchLoadPage, dispatchNoti } from '../../dispatchFunctions/dispatchFunctions'

const MyProfile = () => {
    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)
    const userAvatar = useSelector(userLoginAvtSelector)
    
    const [fileAvatar, setFileAvatar] = useState()
    const [showUpdateAvtBtns, setShowUpdateAvtBtns] = useState(false)
    const [showModalYesno, setShowModalYesno] = useState(false)

    useEffect(() => {
        if(userAvatar === '' || !userAvatar) {
            dispatchGetUserAvt()
        }
    }, [fileAvatar])

    const handleChangeFile = (e) => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            setFileAvatar(inputFile)
        }        
        setShowUpdateAvtBtns(false)
    }

    const handleUploadAvatar = async () => {
        const formdata = new FormData()
        formdata.append('image', fileAvatar)

        dispatchLoadPage()
        let res = await uploadImageCloudinary(formdata)
        if(res && +res.EC === 0) {
            let finalRes = await uploadAvatar(res.DT)
            if (finalRes && +finalRes.EC === 0) {
                dispatchNoti(finalRes.EM)
                dispatchGetUserAvt()
                setFileAvatar('')
                dispatchLoadPage()
            } else {
                dispatchLoadPage()
            }
        } else {
            dispatchLoadPage()
        }
    }

    const handleSaveDeleteAvt = async () => {
        dispatchLoadPage()
        let res = await deleteUserAvatar()
        if(res && +res.EC === 0) {
            dispatchLoadPage()
            dispatchNoti(res.EM)
            dispatchGetUserAvt()
            setShowModalYesno(false)
        } else {
            dispatchLoadPage()
        }
    }
    
    return (
        <div className={`my-profile ${darkTheme ? 'my-profile-dark' : ''}`}>
            <div className='my-profile-header'>
                <YesNoModal
                    show={showModalYesno}
                    title={'Delete avatar'}
                    onClickYes={handleSaveDeleteAvt}
                    onClickCancel={() => {setShowModalYesno(false)}}
                />
                <div className='my-profile-avatar'>
                    {fileAvatar &&
                        <button className='upload-avatar-btn' onClick={handleUploadAvatar}>
                            Upload
                        </button>}
                    
                    {fileAvatar || userAvatar ?
                        (<>
                            <img
                                src={fileAvatar ? URL.createObjectURL(fileAvatar) : userAvatar}
                                onClick={() => {setShowUpdateAvtBtns(true)}}
                            />
                            {showUpdateAvtBtns &&
                                <div className='update-avatar' onClick={e => {
                                    setShowUpdateAvtBtns(false)
                                }}>
                                    <div className='update-avt-btns' onClick={e => e.stopPropagation()}>
                                        {/* delete avt */}
                                        <button
                                            onClick={() => {
                                                setShowUpdateAvtBtns(false)
                                                setShowModalYesno(true)
                                            }}
                                        >
                                            Delete
                                        </button>

                                        {/* change avt */}
                                        <label htmlFor='change-file-avt'>
                                            Change
                                        </label>
                                        <input hidden type='file' accept='image/*' id='change-file-avt' 
                                                onChange={handleChangeFile}/>

                                    </div>
                                </div>}
                        </>) :
                        (<div className='avatar-upload'>
                            <label className='icon-upload' htmlFor='avatar-upload-file'>
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            <input
                                hidden
                                id='avatar-upload-file'
                                type='file'
                                accept="image/*"
                                name="upload-file-avatar"
                                onChange={handleChangeFile}
                            />
                        </div>)}
                </div>

                <div className='my-profile-info'>
                    <h3>{userLogin && userLogin.account.username ? userLogin.account.username : 'unname'}</h3>

                    <div className='info-follow'>
                        <p>100 followers</p>
                        <p>following 100</p>
                    </div>

                    <p>100 posts</p>

                </div>

            </div>

            

            <div className='my-profile-content'>

            </div>


        </div>
    )
}

export default MyProfile