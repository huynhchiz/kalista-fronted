import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './MyProfile.scss'
import { themeSelector, userLoginSelector } from '../../redux/selector'
import { uploadImageCloudinary } from '../../service/imageService'
import { uploadAvatar, getUserAvatar } from '../../service/userService'
import loadPageSlice from '../../slices/loadPageSlice'
import notiModalSlice from '../../slices/notiModalSlice'

const MyProfile = () => {
    const dispatch = useDispatch()
    const loadPage = loadPageSlice.actions.toggleLoadPage

    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    const [fileAvatar, setFileAvatar] = useState()
    const [avatar, setAvatar] = useState()

    const getUserAvatarSV = async () => {
        let data = { email: userLogin.account.email }
        
        let res = await getUserAvatar(data)
        if (res && +res.EC === 0) {
            setAvatar(res.DT.avatar)
        }
    }

    useEffect(() => {
        getUserAvatarSV()
    }, [fileAvatar])

    const handleChangeFile = (e) => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            setFileAvatar(inputFile)
        }
    }

    const buildDataToUploadAvt = (url) => {
        let data = {}
        data = {
            email: userLogin.account.email,
            avatar: url
        }
        return data
    }

    const handleUploadAvatar = async () => {
        const formdata = new FormData()
        formdata.append('image', fileAvatar)

        dispatch(loadPage())
        let res = await uploadImageCloudinary(formdata)
        if(res && +res.EC === 0) {
            let data = buildDataToUploadAvt(res.DT)
            let finalRes = await uploadAvatar(data)
            if (finalRes && +finalRes.EC === 0) {
                dispatch(notiModalSlice.actions.setMessage(finalRes.EM))
                dispatch(notiModalSlice.actions.setShow())
                dispatch(loadPage())
                setFileAvatar('')
            } else {
                dispatch(loadPage())
            }
        } else {
            dispatch(loadPage())
        }
    }
    
    return (
        <div className={`my-profile ${darkTheme ? 'my-profile-dark' : ''}`}>
            <div className='my-profile-header'>
                <div className='my-profile-avatar'>
                    {
                        fileAvatar &&
                        <button className='upload-avatar-btn' onClick={handleUploadAvatar}>
                            Upload
                        </button>
                    }
                    
                    {
                        fileAvatar || avatar ?
                        <img
                            src={fileAvatar ? URL.createObjectURL(fileAvatar) : avatar}
                        />
                        :
                        <div className='avatar-upload'>
                            <label className='icon-upload' htmlFor='avatar-upload-file'>
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            <input
                                hidden
                                id='avatar-upload-file'
                                type='file'
                                name="upload-file-avatar"
                                onChange={handleChangeFile}
                            />
                        </div>
                    }
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