import React from 'react'
import LoginForm, {LoginFormDataType} from "./LoginForm";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import { login } from '../../redux/auth-reducer';
import {Redirect} from "react-router-dom";

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType

const Login: React.FC<LoginPropsType> = ({isAuth, login}) => {

    const onSubmit = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe)
    }
    if (isAuth) return <Redirect to={'/profile'} />
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

export default connect(MapStateToProps, {login} )(Login)