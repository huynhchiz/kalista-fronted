import { useState } from 'react'
import { useImmer } from 'use-immer'
import { useSelector, useDispatch } from 'react-redux'
import { themeSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'

import './Register.scss'
import BigButton from '../re-use/BigButton/BigButton'
import InputText from '../re-use/InputText/InputText'
import { registerUser } from '../../service/signService'
import { checkValidEmail, checkValidPassword } from '../../checkValidFunctions/index.js'
import loadPageSlice from '../../redux/loadPageSlice'

const Register = () => {
    const dispatch = useDispatch()
    const darkTheme = useSelector(themeSelector)
    
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cfPassword, setCfPassword] = useState('')

    const unwarn = {
        isShow: false,
        message: ''
    }

    const warnUnfilled = {
        isShow: true,
        message: 'Unfilled'
    }

    const warnInvalid = {
        isShow: true,
        message: 'Invalid'
    }

    const [emailWarn, setEmailWarn] = useImmer(unwarn)
    const [phoneWarn, setPhoneWarn] = useImmer(unwarn)
    const [usernameWarn, setUsernameWarn] = useImmer(unwarn)
    const [passwordWarn, setPasswordWarn] = useImmer(unwarn)
    const [cfPasswordWarn, setCfPasswordWarn] = useImmer(unwarn)

    const navigate = useNavigate()
    const redirectToIntroduce = () => {
        navigate('/introduce')
    }

    const handleChangeInputValue = (e, setState, setWarn) => {
        setState(e.target.value)
        setWarn(unwarn)
    }

    const handleBlurInput = (e, setWarn) => {
        if(!e.target.value) {
            setWarn(warnUnfilled)
        }
    }

    const checkConfirmPassword = () => {
        return !!(password === cfPassword)
    }

    const buildDataToRegister = () => {
        let data = {}
        data = {
            email: email,
            phone: phone,
            username: username,
            password: password
        }
        return data
    }

    const handleRegisterUser = async () => {
        let isValidEmail = checkValidEmail(email)
        let isValidPassword = checkValidPassword(password)
        let isConfirmPassword = checkConfirmPassword()

        if(!email) {setEmailWarn(warnUnfilled)}
        if(email && !isValidEmail) {setEmailWarn(warnInvalid)}

        if(!phone) {setPhoneWarn(warnUnfilled)}

        if(!username) {setUsernameWarn(warnUnfilled)}

        if(!password) {setPasswordWarn(warnUnfilled)}
        if(password && !isValidPassword) {setPasswordWarn(warnInvalid)}

        if(!cfPassword) {setCfPasswordWarn(warnUnfilled)}
        if(isValidPassword && !isConfirmPassword) {setCfPasswordWarn(warnInvalid)}

        if(email && isValidEmail && phone && username && password && isValidPassword && cfPassword && isConfirmPassword) {
            let data = buildDataToRegister()
            
            let res = await registerUser(data)
            if(res && +res.EC === 0) {
                dispatch(loadPageSlice.actions.toggleShow())

                // loading tam
                setTimeout(() => {
                    dispatch(loadPageSlice.actions.toggleShow())
                    navigate('/login')
                }, 3000)

            } else if (res && +res.EC === -2) {
                setEmailWarn({...warnInvalid, message: res.EM})
            } else if (res && +res.EC === -3) {
                setPhoneWarn({...warnInvalid, message: res.EM})
            }
        }
    }

    return (
        <div className={`register ${darkTheme && 'register-dark'}`}>
            <div className={`register-theme ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
                <div className='register-content'>
                    <div className='register-form'>
                        <InputText placeholder={'Email'} name={'email'}
                            type='text' value={email}
                            onChange={e => handleChangeInputValue(e, setEmail, setEmailWarn)}
                            onBlur={e => handleBlurInput(e, setEmailWarn)}
                            showWarn={emailWarn.isShow} message={emailWarn.message}
                        />
                        <InputText placeholder={'Phone number'} name={'phone'}
                            type='text' value={phone}
                            onChange={e => handleChangeInputValue(e, setPhone, setPhoneWarn)}
                            onBlur={e => handleBlurInput(e, setPhoneWarn)}
                            showWarn={phoneWarn.isShow} message={phoneWarn.message}
                        />
                        <InputText placeholder={'Your name'} name={'username'}
                            type='text' value={username}
                            onChange={e => handleChangeInputValue(e, setUsername, setUsernameWarn)}
                            onBlur={e => handleBlurInput(e, setUsernameWarn)}
                            showWarn={usernameWarn.isShow} message={usernameWarn.message}
                        />
                        <InputText placeholder={'Password'} name={'password'}
                            type='password' value={password}
                            onChange={e => handleChangeInputValue(e, setPassword, setPasswordWarn)}
                            onBlur={e => handleBlurInput(e, setPasswordWarn)}
                            showWarn={passwordWarn.isShow} message={passwordWarn.message}
                        />
                        <InputText placeholder={'Confirm your password'} name={'cfPassword'}
                            type='password' value={cfPassword}
                            onChange={e => handleChangeInputValue(e, setCfPassword, setCfPasswordWarn)}
                            onBlur={e => handleBlurInput(e, setCfPasswordWarn)}
                            showWarn={cfPasswordWarn.isShow} message={cfPasswordWarn.message}
                        />
                    </div>

                    <BigButton className='register-enter-btn'onClick={handleRegisterUser} >SIGN UP</BigButton>
                    
                    <BigButton onClick={redirectToIntroduce}>GO BACK</BigButton>
                </div>
            </div>            
        </div>
    )
}

export default Register