import {authApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET-AUTH-USER-DATA'


export type AuthDataType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}


const initialState: AuthDataType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

type ActionType = SetAuthUserDataType
export const authReducer = (state: AuthDataType = initialState, action: ActionType): AuthDataType => {
    switch (action.type) {
        case "SET-AUTH-USER-DATA":

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

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    try {
        const data = await authApi.login(email, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
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
