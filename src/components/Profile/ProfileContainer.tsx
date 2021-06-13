import React from "react";
import {AppStateType} from "../../redux/store";
import {Profile} from "./Profile";
import {setUserProfileInfo, UserProfileInfoType} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {profileApi} from "../../api/api";

type PropsType = {
    userId: string | undefined
}

type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PropsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        let userId = Number(this.props.match.params.userId)

        if (!userId) {
            userId = 2
        }
        profileApi.getUserProfile(userId)
            .then((data: any) => {

                this.props.setUserProfileInfo(data)

            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type MapStateToPropsType = {
profile: UserProfileInfoType | null
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return   {
        profile: state.profilePage.profile
    }
}

type MapDispatchToPropsType = {
    setUserProfileInfo: (profile: UserProfileInfoType) => void

}

const WithRouterProfileContainer = withRouter(ProfileContainer)

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    MapStateToProps, {setUserProfileInfo})(WithRouterProfileContainer)



