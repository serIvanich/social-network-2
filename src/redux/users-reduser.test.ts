import {followSuccess, unfollowSuccess, usersReducer, UsersType} from "./users-reducer";

let state: UsersType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Olga', followed: false,
                photos: {small: null, large: null}, status: 'status'
            },
            {
                id: 1, name: 'Serhii', followed: false,
                photos: {small: null, large: null}, status: 'status1'
            },
            {
                id: 2, name: 'Gleb', followed: true,
                photos: {small: null, large: null}, status: 'status2'
            },
            {
                id: 3, name: 'Roma', followed: true,
                photos: {small: null, large: null}, status: 'status3'
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
    }
})

test('follow success', () => {

    const newState = usersReducer(state, followSuccess(1))
expect(newState.users[0].followed).toBeFalsy()
expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

    const newState = usersReducer(state, unfollowSuccess(3))
expect(newState.users[3].followed).toBeFalsy()
expect(newState.users[2].followed).toBeTruthy()

})


