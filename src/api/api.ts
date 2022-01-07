import axios from "axios";


export const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae'
        }
    }
)

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


export type ApiResponseType<T = {}, RC = ResultCodeEnum> = {
    data: T
    resultCode: RC
    messages: Array<string>
}

// type UsersResponseType = {
//     items: Array<UserType>
//     totalCount: number
//     error: string
//
// }
// export const usersApi = {
//     getUsers(pageSize: number, currentPage: number) {
//         return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}`)
//             .then(response => response.data)
//     },
//     getFollow(userId: number) {
//         return instance.post<apiResponseType>(`follow/${userId}`)
//             .then(response => response.data)
//     },
//     getUnfollow(userId: number) {
//         return instance.delete<apiResponseType>(`follow/${userId}`)
//             .then(response => response.data)
//     },
// }
//
// export const authApi = {
//     me() {
//         return instance.get<apiResponseType<{
//             id: number, email: string, login: string
//         }>>(`auth/me`)
//             .then(response => response.data)
//     },
//     login(email: string, password: string, rememberMe: boolean, captcha: string) {
//         return instance.post<apiResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe, captcha})
//             .then(res => res.data)
//     },
//     logout() {
//         return instance.delete<apiResponseType>(`auth/login`)
//             .then(res => res.data)
//     }
// }
//
// export const profileApi = {
//     getUserProfile(userId: number) {
//         return instance.get<UserProfileInfoType>(`profile/` + userId)
//             .then(response => response.data)
//     },
//     getUserStatus(userId: number) {
//         return instance.get<string>(`profile/status/${userId}`)
//             .then(res => res.data)
//
//     },
//     changeUserStatus(status: string) {
//         return instance.put<apiResponseType>(`profile/status/`, {status})
//             .then(response => response.data)
//     },
//  savePhoto(photoFile: any) {
//         let formData = new FormData()
//      formData.append('image', photoFile)
//         return instance.put(`profile/photo/`, formData,{
//             headers: {
//                 'Content-Type' : 'multipart/form-data'
//             }
//         })
//
//             .then(response => response.data)
//     },
//     saveProfile(data: SaveProfileType) {
//
//         return instance.put<apiResponseType>(`profile/`, data)
//             .then(response => response.data)
//     },
// }
//
//
// export const securityApi = {
//     getCaptchaUrl() {
//         return instance.get('security/get-captcha-url/').then(response => response.data)
// }
// }
//
// export type SaveProfileType = {
//     userId: number
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
// }
