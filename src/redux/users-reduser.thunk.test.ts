import {follow} from "./users-reducer";
import {ApiResponseType, ResultCodeEnum} from "../api/api";
import usersApi from '../api/users-api';

jest.mock('../api/users-api')

const userAPIMock = usersApi as jest.Mocked<typeof usersApi>

const result: ApiResponseType = {
    data: {},
    resultCode: ResultCodeEnum.Error,
    messages: ['error'],
}




userAPIMock.follow.mockReturnValue(Promise.resolve(result))



const getStateMock = jest.fn()
const dispatchMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.follow.mockClear()
})

test('how many fn work in thunk', async () => {

    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, undefined)


    expect(dispatchMock).toBeCalledTimes(1)
})





