import React, {ComponentType} from "react";
import {AppStateType} from "../../redux/store";
import {Profile} from "./Profile";
import {
    changeUserProfileStatus,
    getUserProfile,
    getUserProfileStatus,
    savePhoto,
    saveProfile,
    UserProfileInfoType
} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type PropsType = {
    userId: string | undefined
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PropsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    refreshProfile() {
        let userId = Number(this.props.match.params.userId)

        if (!userId && this.props.userId) {
            userId = this.props.userId
        }
            if (!userId) {
                this.props.history.push('/login')
            }

        this.props.getUserProfile(userId)
        this.props.getUserProfileStatus(userId)

    }

    componentDidMount() {

        this.refreshProfile()
    }

//@ts-ignore
    componentDidUpdate(prevProps, prevState, snapshot) {


        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} isOwner={!this.props.match.params.userId}
                     status={this.props.status} changeUserProfileStatus={this.props.changeUserProfileStatus}
                     savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
        )
    }
}

type MapStateToPropsType = {
    profile: UserProfileInfoType | null
    status: string
    userId: number | null
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId
    }
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserProfileStatus: (userId: number) => void
    changeUserProfileStatus: (status: string) => void
    savePhoto: Function
    saveProfile: Function
}
// const withAuthRedirectProfileContainer = withAuthRedirect(ProfileContainer)
//
// const WithRouterProfileContainer = withRouter(withAuthRedirectProfileContainer)
//
// export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
//     MapStateToProps, { getUserProfile})(WithRouterProfileContainer)


export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
        MapStateToProps, {getUserProfile, getUserProfileStatus, changeUserProfileStatus, savePhoto, saveProfile}),
    withRouter
)
(ProfileContainer)
