import './InputText.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../../redux/selector'

const InputText = ({ name, type = 'text', placeholder, className, value, onChange, onBlur,
                        showWarn = false, message }) => {
    const darkTheme = useSelector(themeSelector)

    return (
        <div className='input-text-wrap'>
            <input
                name={name}
                className={
                    `${className}
                    input-text
                    ${darkTheme ? 'input-text-dark' : ''}
                    ${showWarn && !darkTheme ? 'input-text-warn' : ''}
                    ${showWarn && darkTheme ? 'input-text-warn-dark' : ''}`
                }
                type={type} placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
            />
            <p
                className='warning-message'
                hidden={!showWarn}
            >
                {message}
            </p>
        </div>
    )
}

export default InputText