import {v1} from 'uuid'
import {usersApi} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";

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
        small: string
        large: (string)
    }
    followed: boolean
}
type UsersType = {
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
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
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
                    ?[...state.followingInProgress, action.userId]
                    :state.followingInProgress.filter(id => id !== action.userId )
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
type ToggleFollowingProgressType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, userId: number, isFetching: boolean  }
export const toggleFollowingProgress = (userId: number, isFetching: boolean ): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    userId, isFetching,
})

type ThunkType = ThunkAction<void, AppStateType, undefined, ActionType>
export const getUsers = (pageSize: number, currentPage: number): ThunkType => (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    usersApi.getUsers(pageSize, currentPage)
        .then((data: any) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })

}

export const follow = (userId: number): ThunkType => (dispatch, getState) => {

    dispatch(toggleFollowingProgress(userId, true))
    usersApi.getFollow(userId)
        .then((data: any) => {

            if (data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(userId, false))
        })
}
export const unfollow = (userId: number): ThunkType => (dispatch) => {

    dispatch(toggleFollowingProgress(userId, true))
    usersApi.getUnfollow(userId)
        .then((data: any) => {

            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(userId, false))
        })
}
