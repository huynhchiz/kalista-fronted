import './Login.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import BigButton from '../re-use/BigButton/BigButton'
import InputText from '../re-use/InputText/InputText'

const Login = () => {
    const darkTheme = useSelector(themeSelector)
    const navigate = useNavigate()

    const redirectToIntroduce = () => {
        navigate('/introduce')
    }

    return (
        <div className={`login ${darkTheme && 'login-dark'}`}>
            <div className={`login-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='login-content'>
                    <div className='login-form'>
                        <InputText placeholder={'Email / phone number'} />
                        <InputText placeholder={'Password'} />
                    </div>

                    <BigButton className='login-enter-btn'>ENTER TO LOGIN</BigButton>
                    
                    <BigButton onClick={redirectToIntroduce}>GO BACK</BigButton>

                </div>
            </div>            
        </div>
    )
}

export default Login