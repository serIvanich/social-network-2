import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post"

import {
    ActionType,
    addPostActionCreate,
    changeTextMessageActionCreate,
    MessageType,
    StoreType
} from "../../../redux/state";

type MyPostPropsType = {
    messages: Array<MessageType>
    textMessage: string | undefined
    dispatch: (action: ActionType) => void
}


export const MyPosts: React.FC<MyPostPropsType> = ({
                                                       messages,
                                                       textMessage,
                                                       dispatch
                                                   }) => {
    const message = messages.map((m, i) => {
        return <Post key={i} message={m.message} likesCount={m.likesCount}/>
    })
    const newPostElement = React.createRef<HTMLTextAreaElement>()
    const clickPost = () => {
        dispatch(addPostActionCreate())
    }
    const onChangeText = () => {
        const text = newPostElement.current?.value
        dispatch(changeTextMessageActionCreate(text))
    }
    return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <div>
                    <textarea ref={newPostElement} value={textMessage} readOnly={false} onChange={onChangeText}/>
                </div>
                <div>
                    <button onClick={clickPost}>add post</button>
                </div>
            </div>
            {message}

        </div>
    )
}

