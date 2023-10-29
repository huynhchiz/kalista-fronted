import './Post.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const Post = () => {
    const darkTheme = useSelector(themeSelector)

    return (
        <div className={`post ${darkTheme && 'post-dark'}`}>
            <div className='post-frame'>

                <div className='post-user'>
                    <div className='post-avatar'>
                        <img className='' src='https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' alt='avatar'/>
                    </div>

                    <div className='post-username'>
                        <p>Huỳnh Chí</p>
                    </div>
                </div>

                <div className='post-image'>
                    <img src='https://i.pinimg.com/564x/aa/af/76/aaaf76d2debe9f9ba4491605bd29454f.jpg' alt='hi'/>
                </div>

                <div className='post-interactions'>
                    <div className='post-caption'>
                            <p>
                                hello world hello world hello world hello world hello world hello world hello world hello world
                                hello world hello world hello world hello world hello world hello world hello world hello world
                                hello world hello world hello world hello world hello world hello world hello world hello world
                            </p>
                        <div className='post-caption-opacity'></div>
                    </div>
                    <div className='post-comments'>
                        <FontAwesomeIcon icon={faComments} />
                    </div>
                    <div className='post-like'>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </div>
                </div>

                <div className='post-info'>
                    <p>100 comments</p>
                    <p>2 days ago</p>
                </div>

                

            </div>
        </div>
    )
}

export default Post