import React, {LegacyRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post"
import {MessageType} from "../../../redux/MyState"

type MyPostPropsType = {
    messages: Array<MessageType>
}
export const MyPosts: React.FC<MyPostPropsType> = ({messages}) => {
    const message = messages.map( (m, i) => <Post key={i} message={m.message} likesCount={m.likesCount} />)
    const newPostElement = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        console.log(newPostElement.current?.value)
    }
    return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <div>
                    <textarea ref={newPostElement}>new message</textarea>
                </div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
            </div>
            {message}

        </div>
    )
}