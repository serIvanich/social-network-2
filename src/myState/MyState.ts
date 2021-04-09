export type MessageType = {
    message: string
    likesCount: number
}
type DialogItemType = {
    id: number
    name: string
}
export type ProfilePageType = {
    messages: Array<MessageType>
}
type DialogTextType = {
    dialogText: string
}
export type DialogsPageType = {
    dialogItems: Array<DialogItemType>
    dialogTexts: Array<DialogTextType>

}
export type MyStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


export const myState: MyStateType = {
    profilePage: {
        messages: [
            {
                message: 'Hello, it is my message!',
                likesCount: 11
            },
            {
                message: 'Hi. I am write message too!',
                likesCount: 2

            },
            {
                message: `Don't forget for me, please!`,
                likesCount: 15
            }
        ]
    },
    dialogsPage: {
        dialogItems: [{id: 1, name: 'Serik'},
            {id: 2, name: 'Olya'},
            {id: 3, name: 'Gleb'},
            {id: 4, name: 'Tanya'},
            {id: 5, name: 'Ivan'},
        ],
        dialogTexts: [{dialogText: 'Hello.How are you?'},
            {dialogText: `Hi, thank's, i am fine.And how are you?`},
            {dialogText: 'I am fine too!'},
        ]
    }
}
