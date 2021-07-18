import React from 'react'
import s from './../../Profile.module.css'
import {UserProfileInfoType} from "../../../../redux/profile-reducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import avatarka from '../../../../assets/images/avatarka.png'
import ProfileStatus from "./ProfileStatusWithHooks";


type ProfileInfoPropsType = {

    profile: UserProfileInfoType | null
    status: string
    changeUserProfileStatus: (status: string) => void

}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = React.memo(({profile, status, changeUserProfileStatus}) => {

    if (!profile) {
        return <Preloader/>
    }
    return (
        <div className={s.profileInfo}>
            <div className={s.imgBlock}>
                {profile.photos.large ? <img src={profile.photos.large}/>
                    : <img src={avatarka}/>}


            </div>


            <div className={s.infoBlock}>
                <h3>{profile.fullName}</h3>
                <ProfileStatus status={status} changeUserProfileStatus={changeUserProfileStatus}/>
                <div>{profile.lookingForAJobDescription}</div>


            </div>

        </div>
    )
})
