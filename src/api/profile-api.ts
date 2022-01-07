import {ApiResponseType, instance} from "./api"
import {PhotosType, ProfileType} from "../type/type";
import { UserProfileInfoType } from "../redux/profile-reducer";


export const profileApi = {
    getUserProfile(userId: number | null) {
        return instance.get<UserProfileInfoType>(`profile/` + userId)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)

    },
    changeUserStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status/`, {status})
            .then(response => response.data)
    },
    savePhoto(photoFile: File) {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ApiResponseType<SavePhotoDataType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

            .then(response => response.data)
    },
    saveProfile(data: ProfileType) {

        return instance.put<ApiResponseType>(`profile/`, data)
            .then(response => response.data)
    },
}

type SavePhotoDataType = {
    photos: PhotosType
}

