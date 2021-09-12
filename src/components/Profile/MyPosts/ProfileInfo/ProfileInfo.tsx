import React, {ChangeEvent, useState} from 'react'
import s from './../../Profile.module.css'
import {UserProfileInfoType} from "../../../../redux/profile-reducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import avatar from '../../../../assets/images/avatarka.png'
import ProfileStatus from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";


type ProfileInfoPropsType = {

    profile: UserProfileInfoType | null
    status: string
    changeUserProfileStatus: (status: string) => void
    isOwner: boolean
    savePhoto: Function
    saveProfile: Function
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = React.memo((
    {profile, status, changeUserProfileStatus, isOwner, savePhoto, saveProfile}) => {

    const [showContacts, setShowContacts] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    let initialValue = {}
    if (profile) {
        initialValue = {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: {
                github: profile.contacts.github,
                vk: profile.contacts.vk,
                facebook: profile.contacts.facebook,
                instagram: profile.contacts.instagram,
                twitter: profile.contacts.twitter,
                website: profile.contacts.website,
                youtube: profile.contacts.youtube,
                mainLink: profile.contacts.mainLink,
            }

        }

    }
    const changeShowContacts = () => {
        setShowContacts(!showContacts)
    }
    const changeEditMode = () => {
        setEditMode(!editMode)
    }
    const onMainPhotoSelected = (e: ChangeEvent<any>) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: UserProfileInfoType) => {
        saveProfile(formData).then (
            () => {
                changeEditMode()
            })

    }
    // const getInitialValues = () => {
    //
    //     profile !== null ? {aboutMe: profile.aboutMe} : ''
    //
    // }

    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.profileInfo}>
                <div className={s.imgBlock}>
                    <img src={profile.photos.large || avatar}/>
                </div>


                <div className={s.infoBlock}>
                    <ProfileStatus status={status} changeUserProfileStatus={changeUserProfileStatus}/>
                    {
                        editMode
                            ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}/>
                            : <ProfileData profile={profile}
                                           showContacts={showContacts} changeShowContacts={changeShowContacts}
                                           isOwner={isOwner}
                                           changeEditMode={changeEditMode}/>
                    }
                </div>

            </div>
            <div>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>
        </div>
    )
})

type ProfileDataPropsType = {
    profile: UserProfileInfoType
    changeShowContacts: () => void
    changeEditMode: () => void
    isOwner: boolean
    showContacts: boolean

}

const ProfileData: React.FC<ProfileDataPropsType> = (
    {
        profile, isOwner,
        showContacts, changeShowContacts, changeEditMode
    }) => {
    return (
        <div>
            {isOwner && <button onClick={changeEditMode}>edit mode</button>}

            <h3>{profile.fullName}</h3>
            <div>
                <b>About me: </b>{profile.aboutMe}
            </div>

            <div>
                <b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            <div>
                <b>My professional skills: </b>{profile.lookingForAJobDescription}
            </div>
            <div>
                <button onClick={changeShowContacts}>
                    {showContacts ? 'Hide contacts' : 'Show contacts'}
                </button>
            </div>
            {showContacts && Object.keys(profile.contacts).map((key, i) => {

                //@ts-ignore
                let value = profile.contacts[key]
                return (
                    <Contact key={i} contactTitle={key} contactValue={value}/>)
            })}

        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue?: string
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {


    return (
        <div className={s.infoBlockContacts}>
            <div>
                <b>{contactTitle}: </b>{contactValue ? contactValue : ''}
            </div>
        </div>
    )
}

