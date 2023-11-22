import { useNavigate, useSearchParams } from 'react-router-dom'

import './PreviewPost.scss'
import avatarUnset from '../../../assets/images/user-avatar-unset.png'
import Comment from '../Comment/Comment'
import { useState } from 'react'

const PreviewPost = ({ type, src }) => {
    const [searchParam] = useSearchParams()
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    return (
        !show ?
        <>
            {type === 'image' &&
            <img className='preview-image' src={src} alt='_preview-explore' onClick={() => setShow(true)}/>}

            {type === 'video' &&
            <video className='preview-video' src={src} alt='_preview-explore' onClick={() => setShow(true)}/>}
        </>
        
        : 

        <div className='single-post-preview-wrapper'>
            <div className='single-post-preview-frame'>
                {/* HEADER */}
                <div className='spp-header'>
                    <div className='spp-avatar-wrapper'>
                        <img src={avatarUnset} />
                    </div>
                    <h4>huynh chi 90524</h4>
                </div>

                {/* CONTENT */}
                <div className='spp-content'>
                    <div className='spp-content-post'>
                        <img src='https://res.cloudinary.com/drk6juqrs/image/upload/v1700636766/pkitu91fzbdyhmjx4nuf.jpg' />
                    </div>

                    <div className='spp-content-comments'>
                        <div className='spp-comments-frame'>

                            <div className ='comment-edit'>
                                <textarea
                                    placeholder='Insert your comment...'
                                    maxLength={120}
                                    // value={comment}
                                    // onChange={e => {handleChangeCommentValue(e)}}
                                />
                                <div className='create-comment-btn'
                                // onClick={handleCreateComment}
                                >
                                    Send
                                </div>
                            </div>

                            <div className='post-comment-content'>
                                {
                                    // listComment && listComment.length > 0 ?
                                    // listComment.map(commentData => (
                                        // <Comment
                                        //     // key={commentData.id}
                                        //     // data={commentData}
                                        // />
                                    // )) :

                                    // <p className='no-comment'>No comment yet!</p>
                                }

                                {
                                    // listComment && listComment.length > 0 && maxComment === false ?
                                    <div className='load-more-cmts-btn'
                                        // onClick={() => {handleAddLimit()}}
                                    >
                                        {/* <FontAwesomeIcon icon={faCirclePlus} /> */}
                                        <p>Load more comments...</p>
                                    </div> 
                                    // : <></>
                                }
                                {
                                    // smallLoad &&
                                    // <div className='small-load-wrapper'>
                                    //     <SmallLoad /> 
                                    // </div>
                                }

                                {
                                    // maxComment === true &&
                                    <p className='max-comment'>
                                        No more comments
                                    </p>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className='spp-footer'>
                    <h3>caption here caption here caption here caption here caption here caption here caption here caption here caption here  here caption here caption here caption here caption here   here caption here caption here caption here caption here   here caption here caption here caption here caption here </h3>
                    <p>11h00 11/11/2023</p>
                </div>


            </div>
        </div>
    )
}

export default PreviewPost