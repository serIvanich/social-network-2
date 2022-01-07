
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {stopSubmit} from "redux-form";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

const SET_AUTH_USER_DATA = 'auth/SET-AUTH-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET-CAPTCHA-URL-SUCCESS'


export type AuthDataType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: string | undefined
}


const initialState: AuthDataType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: undefined
}

type ActionType = SetAuthUserDataType
    | ReturnType<typeof getCaptchaUrlSuccess>

export const authReducer = (state: AuthDataType = initialState, action: ActionType): AuthDataType => {
    switch (action.type) {
        case "auth/SET-AUTH-USER-DATA":
        case "auth/GET-CAPTCHA-URL-SUCCESS":
            return {
                ...state,
                ...action.payload,

            }


        default:
            return state
    }
}


const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)

type SetAuthUserDataType = ReturnType<typeof setAuthUserData>

type ThunkType = ThunkAction<void, AppStateType, undefined, ActionType>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    try {
        const data = await authApi.me()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    } catch (e) {
        console.log(e)
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    try {
        const data = await authApi.login(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
         if (data.resultCode === 10) {
             dispatch(getCaptchaUrl())
         }
            const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            //@ts-ignore
            dispatch(stopSubmit('login', {_error: message}))
        }
    } catch (e) {
        console.log(e)
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    try {
        const data = await authApi.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    } catch (e) {
        console.log(e)
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl()
const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))

}
