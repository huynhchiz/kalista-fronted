import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './MyProfile.scss'
import YesNoModal from '../re-use/YesNoModal/YesNoModal'

import { themeSelector, userLoginSelector, userLoginAvtSelector, postsSelector, followSelector } from '../../redux/selector'
import { uploadImage } from '../../service/postService'
import { deleteUserAvatar, uploadAvatar } from '../../service/userService'
import { dispatchGetUserAvt, dispatchLoadPage, dispatchNoti } from '../../dispatchFunctions/dispatchFunctions'
import { Waypoint } from 'react-waypoint'
import ProfileContent from '../re-use/ProfileContent/ProfileContent'
import { dispatchGetUserPosts } from '../../dispatchFunctions/dispatchPosts'

const MyProfile = () => {
    const darkTheme = useSelector(themeSelector)
    const userLogin = useSelector(userLoginSelector)
    const userAvatar = useSelector(userLoginAvtSelector)
    const posts = useSelector(postsSelector)
    const listPost = posts.userPosts.posts
    const countPost = posts.userPosts.count
    const follow = useSelector(followSelector)
    
    const [fileAvatar, setFileAvatar] = useState()
    const [showUpdateAvtBtns, setShowUpdateAvtBtns] = useState(false)
    const [showModalYesno, setShowModalYesno] = useState(false)
    const [limit, setLimit] = useState(15)

    const handleAddLimit = () => {
        let condition = (+listPost.length < +limit - 15)
        if (!condition) {
            setLimit(limit + 15)
        }
    }

    useEffect(() => {
        if(userAvatar === '' || !userAvatar) {
            dispatchGetUserAvt()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileAvatar])

    useEffect(() => {
        if(limit > 15) {
            dispatchGetUserPosts(userLogin.account.email, limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

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
        let res = await uploadImage(formdata)
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
                        </button>
                    }
                    
                    {fileAvatar || userAvatar ?
                        (<>
                            <img
                                src={fileAvatar ? URL.createObjectURL(fileAvatar) : userAvatar}
                                alt={userLogin.account.username + '_' + userLogin.account.email + '_avatar'}
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
                        <p>{follow.followers.count || '0'} followers</p>
                        <p>following {follow.followings.count || '0'}</p>
                    </div>

                    <p>{countPost ?
                    countPost >=2 ? countPost + ' posts' : countPost + ' post'
                    : '0 post'} </p>

                </div>

            </div>

            <ProfileContent listPost={listPost} />

            <div className='my-profile-footer'>
                <Waypoint
                    onEnter={handleAddLimit}
                />
            </div>
        </div>
    )
}

export default MyProfile