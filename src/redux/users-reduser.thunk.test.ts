import {follow} from "./users-reducer";
import {usersApi} from "../api/users-api";
import {ApiResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")


const result: ApiResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {},

}

const userAPIMock = usersApi as jest.Mocked<typeof usersApi>
userAPIMock.getFollow.mockReturnValue(Promise.resolve(result))
const getStateMock = jest.fn()
const dispatchMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.getFollow.mockClear()
})

test('how many fn does work in thunk', async() => {

    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, undefined)
    expect(dispatchMock).toBeCalledTimes(3)
})





