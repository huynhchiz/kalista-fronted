import './Register.scss'

import { useSelector } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import BigButton from '../re-use/BigButton/BigButton'
import InputText from '../re-use/InputText/InputText'

const Register = () => {
    const darkTheme = useSelector(themeSelector)
    const navigate = useNavigate()

    const redirectToIntroduce = () => {
        navigate('/introduce')
    }

    return (
        <div className={`register ${darkTheme && 'register-dark'}`}>
            <div className={`register-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='register-content'>
                    <div className='register-form'>
                        <InputText placeholder={'Email'} />
                        <InputText placeholder={'Phone number'} />
                        <InputText placeholder={'Your name'} />
                        <InputText placeholder={'Password'} />
                        <InputText placeholder={'Confirm your password'} />
                    </div>

                    <BigButton className='register-enter-btn'>ENTER TO SIGN UP</BigButton>
                    
                    <BigButton onClick={redirectToIntroduce}>GO BACK</BigButton>

                </div>
            </div>            
        </div>
    )
}

export default Register