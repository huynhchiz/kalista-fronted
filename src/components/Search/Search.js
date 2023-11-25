import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { useEffect, useState } from 'react'
import { searchUsersSV } from '../../service/userService'

import NavBack from '../re-use/NavBack/NavBack'
import './Search.scss'
import unsetAvatar from '../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SmallLoad from '../re-use/SmallLoad/SmallLoad'

const Search = () =>  {
    const darkTheme = useSelector(themeSelector)
    
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get('value')

    const [results, setResults] = useState([])
    const [limit, setLimit] = useState(5)
    const [maxResult, setMaxResult] = useState(false)
    const [inputSearch, setInputSearch] = useState('')
    const [smallLoad, setSmallLoad] = useState(false)

    const navigate = useNavigate()

    const fetchSearchUsers = async () =>  {
        let res = await searchUsersSV(searchValue, limit)
        if (res && +res.EC === 0) {
            if(+(res.DT.length) < +limit) {
                setMaxResult(true)
            }
            setResults(res.DT)
        }
    }

    useEffect(() => {
        fetchSearchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, limit])

    const handleBack = () =>  {
        navigate(-1)
    }
    
    const handleChangeSearchInput = (e) => {
        if(e.target.value[0] !== ' ') {
            setInputSearch(e.target.value)
        }
    }

    const handleSearch = () =>  {
        setLimit(5)
        setMaxResult(false)
        if(inputSearch !== '') {
            navigate(`/search?value=${inputSearch}`)
            setInputSearch('')
        }
    }
    
    const handleNavigateToProfile = (userId) => {
        navigate(`/profile?user=${userId}`)
    }

    const handleAddLimit = () =>  {
        setSmallLoad(true)
        setTimeout(() => {
            setLimit(limit + 5)
            setSmallLoad(false)
        }, 1000)
    }

    return (
        <>  <div className='nav-back-search'>
                <NavBack onGoBack={handleBack} />
            </div>

            {/* search bar */}
            <div className='search-container'>
                <div className='search-wrapper'>
                    <input 
                        type='text'
                        placeholder='Search with user name'
                        value={inputSearch}
                        onChange={handleChangeSearchInput}
                    />
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass}
                        className='search-icon' 
                        onClick={handleSearch}
                    />
                </div>
            </div>

            <div className={`search-page${darkTheme ? ' search-page-dark' : ''}`}>
                <div className='search-page-container'>

                    <div className='search-page-header'>
                        <p>
                            Result for: 
                        </p>
                        <h4>
                            {searchValue}
                        </h4>
                    </div>

                    <div className='search-page-content'>

                        {/* loop */}
                        {results && results.length > 0 &&
                            results.map(result => (
                            <div className='search-item' key={'key_' + result.id} onClick={() => handleNavigateToProfile(result.id)}>
                                <div className='search-item-info'>
                                    <img src={result.avatar ? result.avatar : unsetAvatar} alt='_avatar' />

                                    <div className='search-item-user'>
                                        <h4>{result.username ? result.username : ''}</h4>
                                        <p>{result.email ? result.email : ''}</p>

                                        <div className='search-item-follows'>
                                            <p>{result.countFollower} followers</p>
                                            <p>{result.countFollowing} followings</p>
                                            <p>{result.countPost} posts</p>
                                        </div>
                                    </div>

                                </div>                        
                            </div>
                            ))
                        }
                        {/* loop */}
                        
                    </div>

                    <div className='search-page-footer'>
                        {
                            !maxResult ? 

                            (smallLoad ? <SmallLoad /> :
                            <div className='load-more-result-btn' onClick={handleAddLimit}>
                                <p>Click for more results</p>
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </div>)

                            :

                            <div className='max-result'>
                                <p>There are no more relevant search results</p>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
        
    )
}

export default Search