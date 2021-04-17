import React, {LegacyRef} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post"
import {MessageType} from "../../../redux/MyState"

type MyPostPropsType = {
    messages: Array<MessageType>
    addPost: (message: string | undefined) => void
}
export const MyPosts: React.FC<MyPostPropsType> = ({messages, addPost}) => {
    const message = messages.map( (m, i) => <Post key={i} message={m.message} likesCount={m.likesCount} />)
    const newPostElement = React.createRef<HTMLTextAreaElement>()
    const clickPost = () => {
        addPost(newPostElement.current?.value)
    }
    return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <div>
                    <textarea ref={newPostElement}>new message</textarea>
                </div>
                <div>
                    <button onClick={clickPost}>add post</button>
                </div>
            </div>
            {message}

        </div>
    )
}