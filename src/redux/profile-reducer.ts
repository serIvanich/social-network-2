import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {stopSubmit} from "redux-form";
import {profileApi} from "../api/profile-api";
import {PhotosType, ProfileType} from "../type/type";


export const ADD_POST = 'ADD-POST'
export const DELETE_POST = 'DELETE-POST'
export const SET_USER_PROFILE = 'SET-USER-PROFILE'
const GET_USER_PROFILE_STATUS = 'GET-USER-PROFILE-STATUS'
const CHANGE_USER_PROFILE_STATUS = 'CHANGE-USER-PROFILE-STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export type MessageType = {
    id: number
    message: string
    likesCount: number
}

// type PhotosType = {
//     small: string
//     large: string
// }

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string

}

export type ProfilePageType = {
    posts: Array<MessageType>
    textMessage: string
    profile: UserProfileInfoType | null
    status: string

}

export type UserProfileInfoType = {
    userId?: number
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts: ContactsType
    photos: PhotosType
}

export type ProfileActionType = AddPostType
    | SetUsersProfileInfoType
    | GetUserStatusType
    | DeletePostType
    | ReturnType<typeof savePhotoSuccess>


const initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            message: 'Hello, it is my message!',
            likesCount: 11
        },
        {
            id: 2,
            message: 'Hi. I am write message too!',
            likesCount: 2

        },
        {
            id: 3,
            message: `Don't forget for me, please!`,
            likesCount: 15
        }
    ],
    textMessage: '',
    profile: null as UserProfileInfoType | null,
    status: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {

    switch (action.type) {
        case (ADD_POST):

            const newPost = {
                id: 4,
                message: action.text,
                likesCount: 19
            }

            state = {...state, posts: [...state.posts, newPost]}
            state.textMessage = ''
            return state

        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "GET-USER-PROFILE-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "DELETE-POST":
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

        case "SAVE_PHOTO_SUCCESS":
            debugger
            return {
                ...state,
                //@ts-ignore
               profile: {...state.profile, photos: action.photos}
            }

        default:
            return state

    }
}

type AddPostType = { type: typeof ADD_POST, text: string }
export const addPost = (text: string): AddPostType => ({
    type: ADD_POST,
    text
})
type DeletePostType = { type: typeof DELETE_POST, postId: number }
export const deletePost = (postId: number): DeletePostType => ({
    type: DELETE_POST,
    postId
})


type SetUsersProfileInfoType = {
    type: typeof SET_USER_PROFILE
    profile: UserProfileInfoType | null
}

export const setUserProfileInfo = (profile: UserProfileInfoType | null): SetUsersProfileInfoType => ({
    type: SET_USER_PROFILE,
    profile
})

type GetUserStatusType = {
    type: typeof GET_USER_PROFILE_STATUS
    status: string
}
export const getUserStatus = (status: string): GetUserStatusType => ({

    type: GET_USER_PROFILE_STATUS,
    status
})

export const savePhotoSuccess = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)

type ThunkType = ThunkAction<void, AppStateType, undefined, ProfileActionType>

export const getUserProfile = (userId: number| null): ThunkType => async (dispatch) => {

    const data = await profileApi.getUserProfile(userId)
    try {
        dispatch(setUserProfileInfo(data))
    } catch (e) {
        console.log(e)
    }
}

export const getUserProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileApi.getUserStatus(userId)
    try {
        dispatch(getUserStatus(data))
    } catch (e) {
        console.log(e)
    }

}
export const changeUserProfileStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileApi.changeUserStatus(status)
    try {
        if (data.resultCode === 0) {
            dispatch(getUserStatus(status))
        }
    } catch (e) {
        console.log(e)
    }
}
export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    const data = await profileApi.savePhoto(file)
    try {
        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.data.photos))
        }
    } catch (e) {
        console.log(e)
    }
}

export const saveProfile = (payload: ProfileType): ThunkType =>  async (dispatch, getState) => {
    const data = await profileApi.saveProfile(payload)

    if (data.resultCode === 0) {
        dispatch(getUserProfile(payload.userId))
    } else {

        const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        // const contacts = data.messages[0].match(/\w+/g)


        //@ts-ignore
        dispatch(stopSubmit('edit-profile', {_error: message}))
        return Promise.reject(message)
    }
}


