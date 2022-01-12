
import {UserType} from "../type/type"
import {ApiResponseType, instance} from "./api"


const usersApi = {
    getUsers(pageSize: number, currentPage: number, term: string) {
        return instance.get<GetItemsType>(`users?count=${pageSize}&page=${currentPage}&term=${term}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export default usersApi
