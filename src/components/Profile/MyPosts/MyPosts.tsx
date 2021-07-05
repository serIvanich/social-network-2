import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./MyPosts/Post"
import {MessageType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import AddMessageForm, {PostFormDataType} from "./AddMessageForm/ProfileAddMessageForm";


type MyPostPropsType = {
    posts: Array<MessageType>
    textMessage: string
    addPost: (text: string) => void
}


export const MyPosts: React.FC<MyPostPropsType> = React.memo(({
                                                                  posts,
                                                                  textMessage,
                                                                  addPost
                                                              }) => {
    const postsMessages = posts.map((p, i) => {
        return <Post key={i} message={p.message} likesCount={p.likesCount}/>
    })


    const addNewPost = (formData: PostFormDataType) => {
        addPost(formData.myNewPost)
    }
      return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <AddMessageForm onSubmit={addNewPost}/>
             </div>
            {postsMessages}

        </div>
    )
})



