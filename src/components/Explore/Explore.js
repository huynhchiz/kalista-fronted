import './Explore.scss'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { explorePostsSelector, positionScrollSelector } from '../../redux/selectors/postSelector'
import { useEffect, useState } from 'react'
import { dispatchAddLimitExplorePosts, dispatchGetExplorePosts } from '../../dispatchs/dispatchPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Waypoint } from 'react-waypoint'
import SmallLoad from '../re-use/SmallLoad/SmallLoad'
import PreviewPost from '../re-use/PreviewPost/PreviewPost'

const Explore = () => {
    const darkTheme = useSelector(themeSelector)
    const position = useSelector(positionScrollSelector)

    const explorePosts = useSelector(explorePostsSelector)
    const postsExplore = explorePosts.list
    const limit = explorePosts.limit

    const [fullPost, setFullPost] = useState(false)

    useEffect(() => {
        window.scrollTo(0, position.explore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddLimit = () => {
        setTimeout(() => {
            let condition = (+postsExplore.length < +limit - 12)
            if (!condition) {
                dispatchAddLimitExplorePosts(+limit + 12)
            } else if (condition) {
                setFullPost(true)
            }
        }, 1000)
    }
    
    useEffect(() => {
        if(+limit > 12) {
            dispatchGetExplorePosts(+limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <>
            <div className={`explore ${darkTheme ? 'explore-dark' : ''}`}>
                <div className='explore-container'>

                    <div className='explore-header'>
                        <div className='search-wrapper'>
                            <input type='text' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
                        </div>
                    </div>

                    <div className='explore-content'>
                        <div className='explore-frame'>
                            {
                                postsExplore &&
                                postsExplore.map(post => (
                                    <div className='explore-single-preview-post' key={'key_'+post.id}>
                                        <PreviewPost type={post.type} src={post.src}/>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>


                    <div className='explore-footer'>

                        {
                            !fullPost &&
                            <div className='explore-loading'>
                                <SmallLoad />
                            </div>
                        }

                        <Waypoint 
                            onEnter={handleAddLimit}
                        />
                    </div>


                </div>

            </div>        
        </>
        
    )
}

export default Explore