import './LoadPage.scss'
import { Dna } from 'react-loader-spinner'

import { useSelector } from 'react-redux'
import { themeSelector, loadPageSelector } from '../../../redux/selector'

const LoadPage = () => {
    const darkTheme = useSelector(themeSelector)
    const isLoading = useSelector(loadPageSelector)

    return (
        isLoading &&
        <div className={`load-page ${darkTheme && 'load-page-dark'}`}>
            <div className='dna-load-page'>
                <Dna
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </div>
    )
}

export default LoadPage