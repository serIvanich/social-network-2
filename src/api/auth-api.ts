import {instance, ApiResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api"


export const authApi = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<ApiResponseType<LoginResponseDataType, ResultCodeEnum
            | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ApiResponseType>(`auth/login`)
            .then(res => res.data)
    }
}

type MeResponseDataType = {
    id: number
    email: string
    login: string

}
type LoginResponseDataType = {
    userId: number
}