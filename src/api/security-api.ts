import { instance } from "./api"


export const securityApi = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>('security/get-captcha-url/').then(response => response.data)
}
}

type GetCaptchaUrlType = {
    url: string
}