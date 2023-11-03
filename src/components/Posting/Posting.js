import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import './Posting.scss'
import BigButton from '../re-use/BigButton/BigButton'

import { themeSelector } from '../../redux/selector'
import { userLoginSelector } from '../../redux/selector'
import { uploadImageCloudinary, uploadImageService } from '../../service/imageService'
import { dispatchLoadPage, dispatchNoti } from '../../dispatchFunctions/dispatchFunctions'

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

    const buildDataToUpload = (url) => {
        let data = {}
        data = {
            src: url,
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
        let res = await uploadImageCloudinary(formdata)
        if(res && +res.EC === 0) {
            let data = buildDataToUpload(res.DT.toString())
            let finalRes = await uploadImageService(data)

            if(finalRes && +finalRes.EC === 0) {
                dispatchNoti(finalRes.EM)
                dispatchLoadPage()
                navigate('/')

            } else {
                dispatchLoadPage()
                console.log(finalRes.EM);
                navigate('/')
            }

        } else {
            dispatchLoadPage()
            console.log(res.EM);
            navigate('/')
        }
    }

    return (
        <div className={`posting ${darkTheme && 'posting-dark'}`}>
            <div className='posting-content'>
                <div className='space'></div>

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
                    />
                </div>

                {filePreview.src ?
                    <div className='posting-button'>
                        <BigButton onClick={uploadImage}>SHARE POST</BigButton>
                    </div>
                    : 
                    <></>
                }
            </div>
        </div>
    )
}

export default Posting