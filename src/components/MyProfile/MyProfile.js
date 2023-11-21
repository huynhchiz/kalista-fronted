import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './MyProfile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Waypoint } from 'react-waypoint'
import YesNoModal from '../re-use/YesNoModal/YesNoModal'
import ProfileContent from '../re-use/ProfileContent/ProfileContent'
import ModalList from '../re-use/ModalList/ModalList'

import { themeSelector } from '../../redux/selectors/themeSelector'
import { uploadImage } from '../../service/postService'
import { deleteAvatar, uploadAvatar } from '../../service/accountService'
import { dispatchLoadPage, dispatchNoti } from '../../dispatchs/dispatchPageAction'
import { dispatchGetAccountAvatar, dispatchGetAccountPosts, dispatchGetAccountFollowers, dispatchGetAccountFollowings } from '../../dispatchs/dispatchAccount'
import { positionScrollSelector } from '../../redux/selectors/postSelector'
import { accFollowersSelector, accFollowingsSelector, accInfoSelector, accPostsSelector } from '../../redux/selectors/accountSelector'

const MyProfile = () => {
    const darkTheme = useSelector(themeSelector)

    const accountInfo = useSelector(accInfoSelector)
    const accountFollowers = useSelector(accFollowersSelector)
    const accountFollowings = useSelector(accFollowingsSelector)
    const accountPost = useSelector(accPostsSelector)
    const position = useSelector(positionScrollSelector)
    
    const [limit, setLimit] = useState(15)
    const [fileAvatar, setFileAvatar] = useState()
    const [showUpdateAvtBtns, setShowUpdateAvtBtns] = useState(false)
    const [showModalYesno, setShowModalYesno] = useState(false)
    const [showFollower, setShowFollower] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
        if(limit > 15) dispatchGetAccountPosts(limit)
    }, [limit])

    useEffect(() => {
        window.scrollTo(0, position.myProfile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddLimit = () => {
        let condition = (+accountPost.count < +limit - 15)
        if (!condition) {
            setLimit(limit + 15)
        }
    }

    useEffect(() => {
        if(accountInfo.avatar === '' || !accountInfo.avatar) {
            dispatchGetAccountAvatar()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        let res = await uploadImage(formdata)
        if(res && +res.EC === 0) {
            let finalRes = await uploadAvatar(res.DT)
            if (finalRes && +finalRes.EC === 0) {
                dispatchNoti(finalRes.EM)
                dispatchGetAccountAvatar()
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
        let res = await deleteAvatar()
        if(res && +res.EC === 0) {
            dispatchLoadPage()
            dispatchNoti(res.EM)
            dispatchGetAccountAvatar()
            setShowModalYesno(false)
        } else {
            dispatchLoadPage()
        }
    }
    
    const handleShowFollower = () => {
        dispatchGetAccountFollowers(10)
        setShowFollower(true)
    }

    const handleShowFollowing = () => {
        dispatchGetAccountFollowings(10)
        setShowFollowing(true)
    }

    return (
        <>
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
                    
                    {fileAvatar || accountInfo.avatar ?
                        (<>
                            <img
                                src={fileAvatar ? URL.createObjectURL(fileAvatar) : accountInfo.avatar}
                                alt={accountInfo.username + '_' + accountInfo.email + '_avatar'}
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
                    <h3>{accountInfo && accountInfo.username ? accountInfo.username : 'unname'}</h3>

                    <div className='info-follow'>
                        <div className='count-follower' onClick={handleShowFollower}>
                            <p><span>{accountFollowers.count || '0'}</span> followers</p>
                        </div>
                        <div className='count-following' onClick={handleShowFollowing}>
                            <p>following <span>{accountFollowings.count || '0'}</span></p>
                        </div>
                    </div>

                    <div className='count-post'>
                        { accountPost.count >= 2 && (<>
                                <span>{accountPost.count}</span>
                                <p>posts</p>
                            </>)
                        }
                        { accountPost.count === 1 && (<>
                                <span>{accountPost.count}</span>
                                <p>post</p>
                            </>)
                        }
                        { (!accountPost.count || accountPost.count === 0) && (<>
                                <span>0</span>
                                <p>post</p>
                            </>)
                        }
                    </div>

                </div>

            </div>

            <ProfileContent listPost={accountPost.list} />

            <div className='my-profile-footer'>
                <Waypoint
                    onEnter={handleAddLimit}
                />
            </div>

            
        </div>

            {
                showFollower &&
                <ModalList
                    title='Followers'
                    list={accountFollowers.list}
                    onClose={() => setShowFollower(false)}
                />
            }

            {
                showFollowing &&
                <ModalList
                    title='Followings'
                    list={accountFollowings.list}
                    onClose={() => setShowFollowing(false)}
                />
            }

        </>
    )
}

export default MyProfile