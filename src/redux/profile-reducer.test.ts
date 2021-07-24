import {addPost, deletePost, ProfilePageType, profileReducer, UserProfileInfoType} from "./profile-reducer";


let initialState: ProfilePageType
beforeEach(() => {

    initialState = {
        posts: [
            {
                id: 1,
                message: 'Hello, it is my message!',
                likesCount: 11
            },
            {
                id: 2,
                message: 'Hi. I am write message too!',
                likesCount: 2

            },
            {
                id: 3,
                message: `Don't forget for me, please!`,
                likesCount: 15
            }
        ],
        textMessage: '',
        profile: null as UserProfileInfoType | null,
        status: ''
    }
})

it('length of post should be incremented', () => {
    let action = addPost('new text')

    const newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(4)
})
it('message from new post should be correct', () => {
    let action = addPost('new text')

    const newState = profileReducer(initialState, action)

    expect(newState.posts[3].message).toBe('new text')
})
it('length of post should be decremented', () => {
    let action = deletePost(1)

    const newState = profileReducer(initialState, action)

    expect(newState.posts.length).toBe(2)
})
