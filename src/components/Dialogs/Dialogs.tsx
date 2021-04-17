import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'
import {DialogsPageType} from "../../redux/MyState";

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
    state: DialogsPageType
    addDialogsText: (message: string | undefined) => void
}

export const Dialogs: React.FC<DialogsPropsType> = ({state, addDialogsText}) => {

    const dialogsItems = state.dialogItems.map( d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const dialogsTexts = state.dialogTexts.map( (t,i) => <Message key={i} message={t.message}/>)
    const newMessage = React.createRef<HTMLTextAreaElement>()
    const addMessage = () => {
        addDialogsText(newMessage.current?.value)
    }
    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogItem}>
                {dialogsItems}
            </div>
            <div className={s.messages}>
                {dialogsTexts}

                <div className={s.textarea}>
                    <textarea ref={newMessage}>for message</textarea>
                </div>
                <button onClick={addMessage}>add message</button>

            </div>

        </div>
    )
}