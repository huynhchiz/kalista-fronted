import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import './Posting.scss'
import BigButton from '../re-use/BigButton/BigButton'

import { themeSelector } from '../../redux/selector'
import { userLoginSelector } from '../../redux/selector'
import { uploadImage as uploadImageSV, uploadVideo as uploadVideoSV, uploadPost as uploadPostSV } from '../../service/postService'
import { dispatchLoadPage, dispatchNoti } from '../../dispatchFunctions/dispatchFunctions'
import { dispatchGetHomePosts, dispatchGetUserPosts } from '../../dispatchFunctions/dispatchPosts'
import { dispatchResetScrollPosition } from '../../dispatchFunctions/dispatchScrollPosition'

const Posting = () => {
    const navigate = useNavigate()

    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)

    const [filePreview, setFilePreview] = useState({
        src: '',
        type: ''
    })
    const [fileUpload, setFileUpload] = useState('')
    const [caption, setCaption] = useState('')
    const [alt, setAlt] = useState('')
    const [timeUpload, setTimeUpload] = useState('')
    const [dateUpload, setDateUpload] = useState('')

    const captionRef = useRef()

    const handleChangeFile = e => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            if(inputFile.type.includes('video')) {
                setFilePreview({
                    src: URL.createObjectURL(inputFile),
                    type: 'video'
                })
            }
            if(inputFile.type.includes('image')) {
                setFilePreview({
                    src: URL.createObjectURL(inputFile),
                    type: 'image'
                })
            }

            setFileUpload(inputFile)
            setAlt(`${userLogin.account.username}_${Date.now().toString()}`)
            setTimeUpload((new Date().toLocaleTimeString()).toString())
            setDateUpload((new Date().toLocaleDateString().toString()))

            captionRef.current.focus()
        } 
    }

    const handleClosePreview = () => {
        setFilePreview('')
        setFileUpload('')
    }

    const handleChangeCaption = e => {
        setCaption(e.target.value)
    }

    const buildDataToUpload = (url, type) => {
        let data = {}
        data = {
            src: url,
            type: type,
            alt: alt,
            caption: caption,
            time: timeUpload,
            date: dateUpload
        }
        return data
    }

    const uploadImage = async () => {
        const formdata = new FormData()
        formdata.append('image', fileUpload)

        dispatchLoadPage()
        let res = await uploadImageSV(formdata)
        if(res && +res.EC === 0) {
            let data = buildDataToUpload(res.DT.toString(), 'image')
            let finalRes = await uploadPostSV(data)

            if(finalRes && +finalRes.EC === 0) {
                dispatchNoti(finalRes.EM)
                dispatchLoadPage()
                dispatchGetHomePosts(5)
                dispatchGetUserPosts(userLogin.account.email, 15)
                dispatchResetScrollPosition()
                navigate('/')

            } else {
                dispatchLoadPage()
                console.log(finalRes.EM);
            }

        } else {
            dispatchLoadPage()
            console.log(res.EM);
        }
    }

    const uploadVideo = async () => {
        const formdata = new FormData()
        formdata.append('video', fileUpload)

        dispatchLoadPage()
        let res = await uploadVideoSV(formdata)
        if(res && +res.EC === 0) {
            let data = buildDataToUpload(res.DT.toString(), 'video')
            let finalRes = await uploadPostSV(data)

            if(finalRes && +finalRes.EC === 0) {
                dispatchNoti(finalRes.EM)
                dispatchLoadPage()
                dispatchGetHomePosts(5)
                dispatchGetUserPosts(userLogin.account.email, 15)
                dispatchResetScrollPosition()
                navigate('/')
            } else {
                dispatchLoadPage()
                console.log(finalRes.EM);
            }

        } else {
            dispatchLoadPage()
            console.log(res.EM);
        }
    }

    return (
        <div className={`posting ${darkTheme ? 'posting-dark' : ''}`}>
            <div className='posting-content'>
                <div className='posting-title'>
                    <h3>Upload your photo or video</h3>
                </div>

                <div className='posting-preview'>
                    {
                        filePreview.src ?
                        <>
                            {filePreview.type === 'image' && <img alt='preview' src={filePreview.src} />}
                            {filePreview.type === 'video' && <video alt='preview' src={filePreview.src} autoPlay/>}

                            <div className='close-preview-btn' onClick={handleClosePreview}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </div>
                        </>
                        :
                        <>
                            <label className='posting-upload' htmlFor='upload-file'>
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            <input  
                                id='upload-file'
                                type='file'
                                accept='image/*, video/*'
                                name="upload-file"
                                hidden 
                                onChange={handleChangeFile}
                            />
                        </>
                    }
                </div>

                <div className='posting-caption'>
                    <textarea 
                        ref={captionRef}
                        placeholder='Write something about your post...'
                        value={caption}
                        onChange={handleChangeCaption}
                        maxLength={120}
                    />
                </div>

                {filePreview.src &&
                <>
                    {   filePreview.type === 'image' ?
                        <div className='posting-button'>
                            <BigButton onClick={uploadImage}>SHARE IMAGE</BigButton>
                        </div>
                        : 
                        filePreview.type === 'video' &&
                        <div className='posting-button'>
                            <BigButton onClick={uploadVideo}>SHARE VIDEO</BigButton>
                        </div>
                    }
                
                </>
                }
            </div>
        </div>
    )
}

export default Posting