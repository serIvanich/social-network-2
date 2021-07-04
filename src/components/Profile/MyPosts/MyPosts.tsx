import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./MyPosts/Post"
import {MessageType} from "../../../redux/profile-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";


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


    const addNewPost = (formData: FormDataType) => {
        addPost(formData.myNewPost)
    }
      return (
        <div className={s.myPost}>
            <div className={s.messageForm}>
                <AddMessageReduxForm onSubmit={addNewPost}/>
             </div>
            {postsMessages}

        </div>
    )
})

type FormDataType = {
    myNewPost: string
}
const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'myNewPost'} placeholder={'enter post'} component={'textarea'} />

            </div>
            <div>
                <button>add post</button>
            </div>

        </form>
    )
}

const AddMessageReduxForm = reduxForm<FormDataType>({form: 'ProfileMyPost'}) (AddMessageForm)
