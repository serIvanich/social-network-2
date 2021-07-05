import React from 'react'

import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {Header} from "./Header";
import {getAuthUserData, logout} from './../../redux/auth-reducer'

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    getLogout = () => {
        this.props.logout()
    }

    render() {
        return (
            <Header getLogout={this.getLogout} login={this.props.login} isAuth={this.props.isAuth}/>
        )
    }

}

type MapStateToPropsType = {
    login: string | null
    isAuth: boolean
}
const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth

    }
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
    logout: () => void
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    MapStateToProps, {getAuthUserData, logout})(HeaderContainer)
