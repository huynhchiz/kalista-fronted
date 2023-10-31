import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

import './Posting.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useState } from 'react'
import BigButton from '../re-use/BigButton/BigButton'
import { uploadImage as uploadImageSV } from '../../service/imageService'

const Posting = () => {
    const darkTheme = useSelector(themeSelector)
    const [file, setFile] = useState({
        src: '',
        type: ''
    })
    const [fileUpload, setFileUpload] = useState('')
    const [caption, setCaption] = useState('')

    const handleChangeFile = e => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            if(inputFile.type.includes('video')) {
                setFile({
                    src: URL.createObjectURL(inputFile),
                    type: 'video'
                })
            }
            if(inputFile.type.includes('image')) {
                setFile({
                    src: URL.createObjectURL(inputFile),
                    type: 'image'
                })
            }
            setFileUpload(inputFile)
        }       
    }

    const handleClosePreview = () => {
        setFile('')
        setFileUpload('')
    }

    const handleChangeCaption = e => {
        setCaption(e.target.value)
    }

    const uploadImage = async () => {
        const formdata = new FormData()
        formdata.append('image', fileUpload)
        
        let res = await uploadImageSV(formdata)
        if(res && +res.EC === 0) {
            console.log(res.DT);
        }
    }

    return (
        <div className={`posting ${darkTheme && 'posting-dark'}`}>
            <div className='posting-content'>
                <div className='space'></div>

                <div className='posting-preview'>
                    {
                        file.src ?
                        <>
                            {file.type === 'image' && <img alt='preview' src={file.src} />}
                            {file.type === 'video' && <video alt='preview' src={file.src} autoPlay/>}

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
                                name="upload-file"
                                hidden 
                                onChange={handleChangeFile}
                            />
                        </>
                    }
                </div>

                <div className='posting-caption'>
                    <textarea 
                        placeholder='Write something about your post...'
                        value={caption}
                        onChange={handleChangeCaption}
                    />
                </div>

                {file.src ?
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