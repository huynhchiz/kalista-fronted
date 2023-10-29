import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

import './Posting.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useState } from 'react'
import BigButton from '../re-use/BigButton/BigButton'
import { uploadImage as uploadImageSV} from '../../service/imageService'

const Posting = () => {
    const darkTheme = useSelector(themeSelector)

    const [image, setImage] = useState({
        src: '',
        urlUpload: {}
    })
    const [video, setVideo] = useState({
        src: '',
        urlUpload: {}
    })
    const [caption, setCaption] = useState('')

    const handleChangeFile = e => {
        let inputFile = e.target.files[0]
        if (inputFile) {
            if(inputFile.type.includes('video')) {
                setVideo({
                    src: URL.createObjectURL(inputFile),
                    urlUpload: inputFile
                })
            }
            if(inputFile.type.includes('image')) {
                setImage({
                    src: URL.createObjectURL(inputFile),
                    urlUpload: inputFile
                })
            }
        }
    }

    console.log('urlUpload: ', image.urlUpload);

    const handleClosePreview = () => {
        setImage('')
        setVideo('')
    }

    const handleChangeCaption = e => {
        setCaption(e.target.value)
    }

    const convertBase64 = (file) => { // file = image url or video url
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(file);

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        // const fileReader = new FileReader()
        // fileReader.readAsDataURL(file)
        // fileReader.onloadend = () => {
        //     return fileReader.result
        // }
    }

    const uploadImage = async () => {
        if (image.urlUpload) {
            let base64 = await convertBase64(image.urlUpload)

            console.log({ base64 });
            let res = await uploadImageSV(base64)
            if(res && +res.EC === 0) {
                console.log(res.DT);
            }
        }
    }

    return (
        <div className={`posting ${darkTheme && 'posting-dark'}`}>
            <div className='posting-content'>
                <div className='space'></div>

                <div className='posting-preview'>
                    {
                        image.src || video.src ?
                        <>
                            {image.src && <img alt='preview' src={image.src} />}

                            {video.src && <video alt='preview' src={video.src} autoPlay/>}

                            <div className='close-preview-btn' onClick={handleClosePreview}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </div>
                        </>
                        :
                        <>
                            <label className='posting-upload' htmlFor='upload-file'>
                                <FontAwesomeIcon icon={faPlus} />
                            </label>
                            <input id='upload-file' type='file' hidden onChange={handleChangeFile}/>
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

                {image.src || video.src ?
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