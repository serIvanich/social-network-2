import {authApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

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
export const getAuthUserData = (): ThunkType => (dispatch) => {

    authApi.me()
        .then(data => {

            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }

        })
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => (dispatch) => {

    authApi.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}
export const logout = (): ThunkType => (dispatch) => {

    authApi.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}
