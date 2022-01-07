import { Dispatch } from "react"
// import { ThunkAction } from "redux-thunk"
// import { AppStateType } from "../redux/redux-store"

export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : any
export type GetFormValuesKeys<T> = Extract<keyof T, string>
export type MessageType = {
    id: number
    message: string
}

export type DialogType = {
    id: number
    name: string
}

export type PostType = {
    id: number
    likeCount: number
    message: string
}
export type ContactsType ={
    github: string | undefined
    vk: string | undefined
    facebook: string | undefined
    instagram: string | undefined
    twitter: string | undefined
    website: string | undefined
    youtube: string | undefined
    mainLink: string | undefined
}
export type PhotosType = {
    small: string | null
    large: string | null
}
 export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean

}
export type DispatchType<T> = Dispatch<T>
