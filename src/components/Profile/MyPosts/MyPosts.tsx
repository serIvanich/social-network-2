import React, {ChangeEvent, LegacyRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post"
import {MessageType} from "../../../redux/MyState"
import {ADD_POST, CHANGE_TEXT_MESSAGE, StoreType} from "../../../redux/Store";

type MyPostPropsType = {
    messages: Array<MessageType>
    textMessage: string | undefined
    store: StoreType
}
export const MyPosts: React.FC<MyPostPropsType> = ({
                                                       messages,
                                                       textMessage,
                                                       store
                                                   }) => {
    const message = messages.map((m, i) => {
        return <Post key={i} message={m.message} likesCount={m.likesCount}/>
    })
    const newPostElement = React.createRef<HTMLTextAreaElement>()
    const clickPost = () => {
        store.dispatch({type: ADD_POST})
    }
    const onChangeText = () => {
        const text = newPostElement.current?.value
        store.dispatch({type: CHANGE_TEXT_MESSAGE, text})
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