import React from 'react'
import {UserProfileInfoType} from '../../../../../redux/profile-reducer'
import s from '../../../Profile.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
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

            <h3>{'name'}</h3>
            <div>
                <b>About me: </b>{<Field value={'aboutMe'} name={'aboutMe'} component={Input}
                                          validate={[maxLength30]}/>}
            </div>

            <div>
                <b>Looking for a job: </b>{<Field placeholder={'lookingForAJob'} name={'lookingForAJob'}
                                                  component={Input} type={'checkBox'}/>}
            </div>
            <div>
                <b>My professional skills: </b>{<Field placeholder={'lookingForAJobDescription'}
                                                       name={'lookingForAJobDescription'} component={Input}
                                                       validate={[maxLength30]}/>}
            </div>
            <div>
            {profile && Object.keys(profile.contacts).map((key, i) => {
                //@ts-ignore
                let value = profile.contacts[key]

                return <div key={i} className={s.infoBlockContacts}>
                    <div>
                        <b>{key}: </b>{<Field placeholder={value}
                                              name={value} component={Input}
                                              validate={[maxLength30]}/>}
                    </div>
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