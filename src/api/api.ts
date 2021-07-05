import axios from "axios";
import {UserType} from "../redux/users-reducer";
import {UserProfileInfoType} from "../redux/profile-reducer";

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae'
        }
    }
)
type ResponseType<T = {}> = {
    data: T
    resultCode: 0 | 1 | 10
    messages: Array<string>
}
type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string

}
export const usersApi = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    getFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
    getUnfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data)
    },
}

export const authApi = {
    me() {
        return instance.get<ResponseType<{
            id: number, email: string, login: string
        }>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}

export const profileApi = {
    getUserProfile(userId: number) {
        return instance.get<UserProfileInfoType>(`profile/` + userId)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        let pr = instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
        return pr
    },
    changeUserStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, {status})
            .then(response => response.data)
    }
}



