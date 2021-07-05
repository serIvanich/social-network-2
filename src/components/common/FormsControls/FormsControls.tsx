import { WrappedFieldProps } from 'redux-form'
import s from './FormsControls.module.css'


const FormControl: React.FC<WrappedFieldProps> = (props) => {

    const hasError = props.meta.error && props.meta.touched
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{props.meta.error}</span>}
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
