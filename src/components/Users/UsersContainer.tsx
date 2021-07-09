import React, {ComponentType} from 'react'
import {
    follow,
    followSuccess,
    getUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollow,
    unfollowSuccess,

    UserType
} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/users-selector";

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType




class UsersContainer extends React.Component<UsersContainerPropsType, UserType[]> {

    componentDidMount() {
       this.props.getUsers(this.props.pageSize, this.props.currentPage)
    }

    changeCurrentPage = (page: number) => {

        this.props.getUsers(this.props.pageSize, page)

    }



    getUnfollowCallback = (userId: number) => {
        this.props.unfollow(userId)

    }
    getFollowCallback = (userId: number) => {
        this.props.follow(userId)
    }

    render() {


        return (
            <Users users={this.props.users}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   isFetching={this.props.isFetching}
                   followingInProgress={this.props.followingInProgress}
                   changeCurrentPage={this.changeCurrentPage}
                   getFollowCallback={this.getFollowCallback}
                   getUnfollowCallback={this.getUnfollowCallback}

            />
        )
    }
}

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

type MapDispatchToPropsType = {

    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFollowingProgress: (userId: number, isFetching: boolean) => void
    getUsers: (pageSize: number, currentPage: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


// export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
//     MapStateToProps, { getUsers,follow,unfollow,
//         setCurrentPage, setTotalUsersCount, toggleFollowingProgress
//     })(UsersContainer)

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    MapStateToProps, { getUsers,follow,unfollow,
        setCurrentPage, setTotalUsersCount, toggleFollowingProgress}),

)
    (UsersContainer)
