import React from 'react'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

export type LoginFormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength9 = maxLengthCreator(9)
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'login'} component={Input} validate={[required, maxLength9]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input} validate={[required, maxLength9]}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={Input} type={'checkbox'} validate={[required, maxLength9]}/>Remember Me
            </div>
            <div>
                <button>login</button>
            </div>



        </form>
    )
}

export default reduxForm<LoginFormDataType>({form: 'login'})(LoginForm)

