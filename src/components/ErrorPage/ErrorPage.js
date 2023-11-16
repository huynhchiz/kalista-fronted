import { dispatchLoadPage } from '../../dispatchFunctions/dispatchFunctions'
import { themeSelector } from '../../redux/selectors/themeSelector'
import { errorSelector } from '../../redux/selectors/errorSelector'
import { useSelector } from 'react-redux'

import './ErrorPage.scss'

const ErrorPage = () => {
    const darkTheme = useSelector(themeSelector)
    const isError = useSelector(errorSelector)

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        isError &&
        <div className={`error-page-wrapper${darkTheme ? ' error-page-wrapper-dark': ''}`}
            onClick={refreshPage}    
        >
            <div className='error-page'>
                <h1>SOMETHING WENT WRONG...</h1>
            </div>
        </div>
    )
}

export default ErrorPage