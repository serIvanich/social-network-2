import React from 'react'
import s from '../../../Profile.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../../../../utils/validators/validators";
import {UserProfileInfoType} from "../../../../../redux/profile-reducer";
import style from '../../../../common/FormsControls/FormsControls.module.css'


// export type ProfileDataFormType = {
//
//     fullName: string
//     aboutMe: string
//     lookingForAJob: boolean
//     lookingForAJobDescription: string
//     contacts: {
//         github: string
//         vk: string
//         facebook: string
//         instagram: string
//         twitter: string
//         website: string
//         youtube: string
//         mainLink: string
//     }

//}

const ProfileDataForm: React.FC<InjectedFormProps<UserProfileInfoType>> = (
    props
) => {

    console.log(props)

    // const maxLength30 = maxLengthCreator(30)
    return (
        < form onSubmit={props.handleSubmit}>
            <button>enter</button>

            <div>
                {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>About me: </b>
                {createField('aboutMe', 'aboutMe', [], Textarea)}
            </div>

            <div>
                <b>Looking for a job: </b>{createField('', 'lookingForAJob',
                [], Input, {type: 'checkBox'})}

            </div>
            <div>
                <b>My professional skills: </b>{createField('My professional skills',
                'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                {props.initialValues.contacts && Object.keys(props.initialValues.contacts).map((key, i) => {


                    return <div key={i} className={s.infoBlockContacts}>

                        <b>{key}: </b>{createField(key, 'contacts.' + key, [], Input)}


                    </div>
                })
                }
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
        </form>
    )
}


export default reduxForm<UserProfileInfoType>({form: 'edit-profile'})(ProfileDataForm)