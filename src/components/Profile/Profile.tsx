import React from 'react'
import s from './Profile.module.css'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfo} from "./MyPosts/ProfileInfo/ProfileInfo";
import {UserProfileInfoType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: UserProfileInfoType | null
    status: string
    changeUserProfileStatus: (status: string) => void
    isOwner: boolean
savePhoto: Function
}

export const Profile: React.FC<ProfilePropsType> = React.memo((
    {profile, status, changeUserProfileStatus, isOwner, savePhoto}) => {

    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile} status={status} savePhoto={savePhoto}
                         isOwner={isOwner} changeUserProfileStatus={changeUserProfileStatus}/>
            <MyPostsContainer/>
        </div>
    )
})
