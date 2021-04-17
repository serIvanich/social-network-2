import React from 'react'
import s from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfilePageType} from "../../redux/MyState";

type ProfilePropsType = {
    state: ProfilePageType
    addPost: (message: string | undefined) => void
}

export const Profile: React.FC<ProfilePropsType> = ({state, addPost}) => {

    return (
        <div className={s.profile}>
            <img src={'https://www.captainbrianonthewater.com/wp-content/uploads/2012/03/download-13.jpg'} />
            <div>
ava and my profile
            </div>
            <MyPosts messages={state.messages} addPost={addPost}/>
        </div>
    )
}
