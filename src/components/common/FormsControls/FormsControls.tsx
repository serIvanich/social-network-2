import React from 'react'
import {Field, WrappedFieldProps} from 'redux-form'
import s from './FormsControls.module.css'


const FormControl: React.FC<WrappedFieldProps> = ({meta: {error, touched}, children}) => {

    const hasError = error && touched
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )

}

export const Textarea: React.FC< WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>

    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>

    )
}

export const createField = (placeholder: string, name: string, validators: Function[],
                            component: React.FC<WrappedFieldProps>, type: string, props={}, text='') => {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component} {...props} type={type} />{text}
    </div>

}

