import {usersApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'


export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}
export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

const initialState: UsersType = {
    users: [],
    pageSize: 99,
    totalUsersCount: 50,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [],
}

type ActionType =
    FollowSuccessType
    | UnFollowSuccessType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetchingType
    | ToggleFollowingProgressType

export const usersReducer = (state: UsersType = initialState, action: ActionType): UsersType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true} )
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false} )
            }
        case "SET-USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET-TOTAL-USERS-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount / 10
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE-IS-FOLLOWING-PROGRESS':
            return {
                ...state,

                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }

}

type FollowSuccessType = { type: typeof FOLLOW, userId: number }
export const followSuccess = (userId: number): FollowSuccessType => ({
    type: FOLLOW,
    userId
})

type UnFollowSuccessType = { type: typeof UNFOLLOW, userId: number }
export const unfollowSuccess = (userId: number): UnFollowSuccessType => ({
    type: UNFOLLOW,
    userId
})

type SetUsersType = { type: typeof SET_USERS, users: Array<UserType> }
export const setUsers = (users: Array<UserType>): SetUsersType => ({
    type: SET_USERS,
    users
})

type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalCount,
})
export type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
})
type ToggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, userId: number, isFetching: boolean }
export const toggleFollowingProgress = (userId: number, isFetching: boolean): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    userId, isFetching,
})

type ThunkType = ThunkAction<void, AppStateType, undefined, ActionType>
export const getUsers = (pageSize: number, currentPage: number): ThunkType => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const data = await usersApi.getUsers(pageSize, currentPage)

        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    } catch (e) {
        console.log(e)
    }

}

const followUnfollowFlow = async(dispatch: Dispatch, userId: number, apiMethod:any, actionCreator: any) => {

    try {
        dispatch(toggleFollowingProgress(userId, true))
        const data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowingProgress(userId, false))
    } catch (e) {
        console.log(e)
    }

}

export const follow = (userId: number): ThunkType => async (dispatch, getState) => {
    const apiMethod = usersApi.getFollow.bind(usersApi)
    const actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = usersApi.getUnfollow.bind(usersApi)
    const actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}
