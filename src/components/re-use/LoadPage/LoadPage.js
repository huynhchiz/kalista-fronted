import './LoadPage.scss'
import { ThreeCircles } from 'react-loader-spinner'

import { useSelector } from 'react-redux'
import { themeSelector, loadPageSelector } from '../../../redux/selector'

const LoadPage = () => {
    const darkTheme = useSelector(themeSelector)
    const isLoading = useSelector(loadPageSelector)

    return (
        isLoading &&
        <div className={`load-page ${darkTheme ? 'load-page-dark' : ''}`}>
            <div className='dna-load-page'>
            <ThreeCircles
                height="150"
                width="150"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="#ebca47"
                innerCircleColor="#ebca47"
                middleCircleColor="#ebca47"
            />
            </div>
        </div>
    )
}

export default LoadPage