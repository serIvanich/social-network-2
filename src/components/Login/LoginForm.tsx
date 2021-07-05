import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from './../common/FormsControls/FormsControls.module.css'

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const maxLength29 = maxLengthCreator(29)
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[required, maxLength29]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={'password'} component={Input} validate={[required, maxLength29]}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'checkbox'} />Remember Me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>login</button>
            </div>



        </form>
    )
}

export default reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)

