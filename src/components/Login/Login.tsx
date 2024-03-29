import React from 'react'
import LoginForm, {LoginFormDataType} from "./LoginForm";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import { login } from '../../redux/auth-reducer';
import {Redirect} from "react-router-dom";

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const Login: React.FC<LoginPropsType> = ({isAuth, login, captchaUrl}) => {

    const onSubmit = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (isAuth) return <Redirect to={'/profile'} />
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} initialValues={{captchaUrl: captchaUrl}} />
        </div>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | undefined
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export default connect(MapStateToProps, {login} )(Login)