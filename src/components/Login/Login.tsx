import React from 'react'
import LoginForm, {LoginFormDataType} from "./LoginForm";


export const Login: React.FC = () => {

    const onSubmit = (formData: LoginFormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}
