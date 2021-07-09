import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, withRouter} from 'react-router-dom';
import {Music} from './components/Music/Music';
import {News} from "./components/News/News";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {getAppInitialized} from "./redux/app-reducer";
import {connect} from "react-redux";
import {AppStateType} from "./redux/store";
import {compose} from "redux";
import {Preloader} from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initialize: boolean
    getAppInitialized: () => void
}


 class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.getAppInitialized()
    }

    render() {
        if (!this.props.initialize) {
            return <Preloader />
        }

        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='wrapper-content'>
                    <Route exact path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                </div>
            </div>

        );
    }
}

type MapStateToPropsType = {
    initialize: boolean
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {initialize: state.app.initialize}
}

type MapDispatchToPropsType = {
    getAppInitialized: () => void
}
export default compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (MapStateToProps, {getAppInitialized})
)
(App)
