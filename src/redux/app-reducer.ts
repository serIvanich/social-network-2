import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZE_SUCCESS = 'SET-INITIALIZE-SUCCESS'


const initialState = {
    initialize: false
}

export type AppType = typeof initialState

type ActionType = SetAppInitializeType

export const appReducer = (state: AppType = initialState, action: ActionType): AppType => {
    switch (action.type) {
        case 'SET-INITIALIZE-SUCCESS':

            return {
                ...state,
                initialize: true
            }
        default:
            return state
    }
}


const setAppInitialize = () => ({
    type: SET_INITIALIZE_SUCCESS
} as const)
type SetAppInitializeType = ReturnType<typeof setAppInitialize>

type ThunkType = ThunkAction<void, AppStateType, undefined, ActionType>
export const getAppInitialized = (): ThunkType =>  (dispatch) => {
debugger
    const pr = dispatch(getAuthUserData())
    Promise.all([pr])
        .then(() => {
            dispatch(setAppInitialize())
        })
}