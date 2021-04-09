import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'
import {DialogsPageType} from "../../myState/MyState";

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
    message: string
}

const Message: React.FC<MessagePropsType> = ({message}) => {
    return (
        <div className={s.message}>{message}</div>
    )
}

type DialogsPropsType = {
    dialogsPage: DialogsPageType
}

export const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage}) => {
    const dialogs = dialogsPage.dialogItems
    const dialogsItems = dialogsPage.dialogItems.map( d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    const dialogsTexts = dialogsPage.dialogTexts.map( (t,i) => <Message key={i} message={t.dialogText}/>)
    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogItem}>
                {dialogsItems}
            </div>
            <div className={s.messages}>
                {dialogsTexts}
            </div>
        </div>
    )
}