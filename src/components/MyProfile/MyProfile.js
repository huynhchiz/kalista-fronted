import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './MyProfile.scss'
import { themeSelector } from '../../redux/selector'
import { uploadImageCloudinary } from '../../service/imageService'

const MyProfile = () => {
    const dispatch = useDispatch()
    const darkTheme = useSelector(themeSelector)
    const [fileAvatar, setFileAvatar] = useState()

    const handleChangeFile = (e) => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            setFileAvatar(inputFile)
        }
    }

    const handleUploadAvatar = async () => {
        const formdata = new FormData()
        formdata.append('image', fileAvatar)

        // dispatch(loadPage())
        let res = await uploadImageCloudinary(formdata)
        if(res && +res.EC === 0) {
            console.log(res.EM);
        }
    }
    
    return (
        <div className={`my-profile ${darkTheme ? 'my-profile-dark' : ''}`}>
            <div className='my-profile-header'>
                <div className='my-profile-avatar'>
                    {
                        fileAvatar ?
                        <button className='upload-avatar-btn' onClick={handleUploadAvatar}>
                            Upload
                        </button> 
                        :
                        <></>
                    }

                    {
                        fileAvatar ?
                        <img
                            src={URL.createObjectURL(fileAvatar)}
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
                    <h3>Huynh Chi</h3>

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