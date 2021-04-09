import React from 'react'
import s from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfilePageType} from "../../myState/MyState";

type ProfilePropsType = {
    profilePage: ProfilePageType
}
export const Profile: React.FC<ProfilePropsType> = ({profilePage}) => {

    return (
        <div className={s.profile}>
            <img src={'https://www.captainbrianonthewater.com/wp-content/uploads/2012/03/download-13.jpg'} />
            <div>
ava and my profile
            </div>
            <MyPosts messages={profilePage.messages}/>
        </div>
    )
}
