import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useImmer } from 'use-immer'

import { themeSelector } from '../../redux/selector'
import './Login.scss'
import BigButton from '../re-use/BigButton/BigButton'
import InputText from '../re-use/InputText/InputText'
import { loginUserService } from '../../service/signService'

const Login = () => {
    const darkTheme = useSelector(themeSelector)
    const navigate = useNavigate()

    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')

    const unwarn = {
        isShow: false,
        message: ''
    }
    const warnUnfilled = {
        isShow: true,
        message: 'Unfilled',
    }

    const [loginValueWarn, setLoginValueWarn] = useImmer(unwarn)
    const [passwordWarn, setPasswordWarn] = useImmer(unwarn)

    const [loginWarning, setLoginWarning] = useState('')

    const redirectToIntroduce = () => {
        navigate('/introduce')
    }

    const handleChangeInputValue = (e, setState, setWarn) => {
        setState(e.target.value)
        setWarn(unwarn)
        setLoginWarning('')
    }

    const handleBlurInput = (e, setWarn) => {
        if(!e.target.value) {
            setWarn(warnUnfilled)
        }
    }

    const buildDataToLogin = () => {
        let data = {}
        data = { loginValue: loginValue, password: password }
        return data
    }

    const handeLoginUser = async () => {
        if(!loginValue) {setLoginValueWarn(warnUnfilled)}
        if(!password) {setPasswordWarn(warnUnfilled)}

        if(loginValue && password) {
            let data = buildDataToLogin()
            let res = await loginUserService(data)

            if(res && +res.EC === 0) {
                console.log(res.EM);
                console.log(res.DT);
            } else {
                setLoginWarning(res.EM)
            }
        }
    }

    return (
        <div className={`login ${darkTheme && 'login-dark'}`}>
            <div className={`login-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='login-content'>
                    <div className='form-title'>
                        <h1 className={`${darkTheme && 'form-title-dark'}`}>
                            LOGIN
                        </h1>
                        <p className='warning-login'>
                            {loginWarning}
                        </p>
                    </div>
                    <div className='login-form'>
                        
                        <InputText placeholder={'Email / phone number'} name={'loginValue'}
                            type='text' value={loginValue}
                            onChange={e => handleChangeInputValue(e, setLoginValue, setLoginValueWarn)}
                            onBlur={e => handleBlurInput(e, setLoginValueWarn)}
                            showWarn={loginValueWarn.isShow} message={loginValueWarn.message}
                        />

                        <InputText placeholder={'Password'} name={'password'}
                            type='password' value={password}
                            onChange={e => handleChangeInputValue(e, setPassword, setPasswordWarn)}
                            onBlur={e => handleBlurInput(e, setPasswordWarn)}
                            showWarn={passwordWarn.isShow} message={passwordWarn.message}
                        />
                    </div>

                    <BigButton className='login-enter-btn' onClick={handeLoginUser}>ENTER TO LOGIN</BigButton>
                    
                    <BigButton onClick={redirectToIntroduce}>GO BACK</BigButton>

                </div>
            </div>            
        </div>
    )
}

export default Login