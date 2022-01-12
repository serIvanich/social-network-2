import React from 'react'
import {UserType} from "../../redux/users-reducer"
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";

type UsersPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    changeCurrentPage: (currentPage: number) => void
    getFollowCallback: (userId: number) => void
    getUnfollowCallback: (userId: number) => void
}


const Users: React.FC<UsersPropsType> = ({
                                             totalUsersCount, pageSize,
                                             currentPage, isFetching,
                                             changeCurrentPage, followingInProgress,
                                             getUnfollowCallback, getFollowCallback, ...props
                                         }) => {

    return (
        <div>

            <UsersSearchForm/>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage}
                       isFetching={isFetching} changeCurrentPage={changeCurrentPage}/>
            {
                props.users.map(u => <User key={u.id}
                                           user={u}
                                           followingInProgress={followingInProgress}
                                           changeCurrentPage={changeCurrentPage}
                                           getFollowCallback={getFollowCallback}
                                           getUnfollowCallback={getUnfollowCallback}/>
                )
            }
        </div>
    )
}


export default Users