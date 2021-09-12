import React from 'react'
import {UserProfileInfoType} from '../../../../../redux/profile-reducer'
import s from '../../../Profile.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../../../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../../../../utils/validators/validators";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../../redux/store";


type ProfileDataFormPropsType = {
    profile: UserProfileInfoType
    // changeUserProfileStatus: (status: string) => void
    // changeShowContacts: () => void
    // showContacts: boolean

}

export type ProfileDataFormType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormType>> = (
    {handleSubmit}
) => {
const profile = useSelector<AppStateType, UserProfileInfoType | null>(state => state.profilePage.profile)
    const maxLength30 = maxLengthCreator(30)
    return (
        < form onSubmit={handleSubmit}>
            <button >enter</button>

            <div>
                {createField('Full name', 'full name', [maxLength30], Input, 'text' )}
            </div>
            <div>
                <b>About me: </b>{createField('aboutMe', 'aboutMe', [maxLength30], Input, 'text' )}
            </div>

            <div>
                <b>Looking for a job: </b>{createField('lookingForAJob', 'lookingForAJob',
                [maxLength30], Input, 'checkBox' )}

            </div>
            <div>
                <b>My professional skills: </b>{createField('lookingForAJobDescription',
                'lookingForAJobDescription', [maxLength30], Input, 'text' )}
            </div>
            <div>
            {profile && Object.keys(profile.contacts).map((key, i) => {
                //@ts-ignore
                let value: string = profile.contacts[key]

                return <div key={i} className={s.infoBlockContacts}>

                        <b>{key}: </b>{createField(value, key, [maxLength30], Input, 'text' )}


                </div>
            })
            }
            </div>
        </form>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {


    return (
        <div className={s.infoBlockContacts}>
            <div>
                <b>{contactTitle}: </b>{contactValue}
            </div>
        </div>
    )
}

export default reduxForm<ProfileDataFormType>({form: 'profile'})(ProfileDataForm)