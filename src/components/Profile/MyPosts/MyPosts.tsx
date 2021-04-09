import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post"
import {MessageType} from "../../../myState/MyState"

type MyPostPropsType = {
    messages: Array<MessageType>
}
export const MyPosts: React.FC<MyPostPropsType> = ({messages}) => {
    return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <textarea>new message</textarea>
                <input type='submit' value={'submit'}/>
            </div>
            {messages.map( (m, i) => <Post key={i} message={m.message} likesCount={m.likesCount} />)}

        </div>
    )
}