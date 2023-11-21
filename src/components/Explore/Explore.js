import './Explore.scss'
import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { explorePostsSelector, positionScrollSelector } from '../../redux/selectors/postSelector'
import { useEffect } from 'react'
import { dispatchGetExplorePosts } from '../../dispatchs/dispatchPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Explore = () => {
    const darkTheme = useSelector(themeSelector)
    const position = useSelector(positionScrollSelector)

    const explorePosts = useSelector(explorePostsSelector)
    const postsExplore = explorePosts.list
    const limit = explorePosts.limit

    useEffect(() => {
        dispatchGetExplorePosts(20)
    }, [])

    useEffect(() => {
        window.scrollTo(0, position.explore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
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
                                <div className='explore-single-preview-post'>
                                    <img src={post.src} alt='_preview-explore' />
                                </div>
                            ))
                        }
                        
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Explore