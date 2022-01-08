import {follow} from "./users-reducer";
import {usersApi} from "../api/users-api";
import {ApiResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")
const userAPIMock = usersApi as jest.Mocked<typeof usersApi>

const result: ApiResponseType = {
    data: {},
    resultCode: ResultCodeEnum.Success,
    messages: [],
}

userAPIMock.getFollow.mockReturnValue(Promise.resolve(result))
const getStateMock = jest.fn()
const dispatchMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.getFollow.mockClear()
})

test('how many fn does work in thunk', async () => {

    const thunk = follow(1)
    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
})





