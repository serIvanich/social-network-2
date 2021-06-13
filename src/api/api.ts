import axios from "axios";

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {
            'API-KEY': '4cdd576b-fe8e-4ab2-8ae3-522fa7c936ae'
        }
    }
)
export type GetUsersResponceType = {

}
export const usersApi = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    getFollow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    getUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
}

export const authApi = {
    getAuthMe() {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
            .then(response => response.data)
    }
}

export const profileApi = {
    getUserProfile(userId: number ) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    }
}



