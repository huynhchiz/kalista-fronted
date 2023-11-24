import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { useEffect, useState } from 'react'
import { searchUsersSV } from '../../service/userService'

import NavBack from '../re-use/NavBack/NavBack'
import './Search.scss'
import unsetAvatar from '../../assets/images/user-avatar-unset.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = () =>  {
    const darkTheme = useSelector(themeSelector)
    
    const [searchParams] = useSearchParams()
    const searchValue = searchParams.get('value')

    const [results, setResults] = useState([])
    const [limit, setLimit] = useState(5)
    const [maxResult, setMaxResult] = useState(false)

    const navigate = useNavigate()

    const fetchSearchUsers = async () =>  {
        let res = await searchUsersSV(searchValue, limit)
        if (res && +res.EC === 0) {
            console.log(res.DT);
            setResults(res.DT)
        }
    }

    useEffect(() => {
        fetchSearchUsers()
    }, [])

    const handleBack = () =>  {
        navigate(-1)
    }

    return (
        <>
            <NavBack onGoBack={handleBack} />

            {/* search bar */}
            <div className='search-container'>
                <div className='search-wrapper'>
                    <input 
                        type='text'
                        placeholder='Search with user name'
                        // value={inputSearch}
                        // onChange={handleChangeSearchInput}
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' 
                    // onClick={handleSearch}
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
                            <div className='search-item'>
                                <div className='search-item-info'>
                                    <img src={result.avatar ? result.avatar : unsetAvatar} alt='_avatar' />

                                    <div className='search-item-user'>
                                        <h4>huynh chi 90524</h4>
                                        <p>email@gmail.com</p>

                                        <div className='search-item-follows'>
                                            <p>1000 followers</p>
                                            <p>1000 followings</p>
                                            <p>1000 posts</p>
                                        </div>
                                    </div>

                                </div>                        
                            </div>
                            ))
                        }
                        {/* loop */}
                        
                    </div>

                </div>
            </div>
        
        
        </>
        
    )
}

export default Search