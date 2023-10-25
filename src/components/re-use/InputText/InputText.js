import './InputText.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'

const InputText = ({type = 'text', placeholder, className}) => {
    const darkTheme = useSelector(themeSelector)

    return (
        <input className={`input-text ${className} ${darkTheme && 'input-text-dark'}`} type={type} placeholder={placeholder} />
    )
}

export default InputText