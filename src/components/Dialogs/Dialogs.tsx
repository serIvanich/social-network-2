import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'
import {DialogItemType, DialogsTextsType} from "../../redux/dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type DialogsItemPropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<DialogsItemPropsType> = ({id, name}) => {
    return (

        <NavLink className={s.item} activeClassName={s.active} to={'/dialogs/' + id}>{name}</NavLink>
    )
}

type MessagePropsType = {
    message: string | undefined
}

const Message: React.FC<MessagePropsType> = ({message}) => {
    return (
        <div className={s.message}>{message}</div>
    )
}

type DialogsPropsType = {
    isAuth: boolean
    dialogItems: Array<DialogItemType>
    dialogTexts: Array<DialogsTextsType>
    newMessage: string
    addMessage: (text: string) => void
}

export const Dialogs: React.FC<DialogsPropsType> = React.memo((props) => {

    const dialogsItems = props.dialogItems.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const dialogsTexts = props.dialogTexts.map((t, i) => <Message key={i} message={t.message}/>)

    const addMessage = (formData: FormDataType) => {
        console.log(formData.newMessage)
        props.addMessage(formData.newMessage)
    }

    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogItem}>
                {dialogsItems}
            </div>
            <div className={s.messages}>
                {dialogsTexts}

                <AddMessageReduxForm onSubmit={addMessage}/>

            </div>

        </div>
    )
})

type FormDataType = {
    newMessage: string
}
const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.textarea}>

                <Field name={'newMessage'} component={'textarea'} placeholder={'Enter your messages'}/>

            </div>
            <button>add message</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({form: 'Dialogs'})(AddMessageForm)
