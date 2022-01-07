
import {UserType} from "../type/type"
import {ApiResponseType, instance} from "./api"


export const usersApi = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetItemsType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    getFollow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getUnfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}