import {UserType} from "../redux/users-reducer";

export const updateObjectInArray = (items: Array<UserType>, itemId: number, objPropName: 'id', newObjProps: {followed: boolean}) => {
    return items.map((u: UserType) => {
        const id = u[objPropName]
        if (id === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}
