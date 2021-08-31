import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import {Music} from './components/Music/Music';
import {News} from "./components/News/News";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {getAppInitialized} from "./redux/app-reducer";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/store";
import {compose} from "redux";
import {Preloader} from "./components/common/Preloader/Preloader";

const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'));

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
            return <Preloader/>
        }

        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='wrapper-content'>
                    <Route exact path={'/dialogs'} render={() => {
                        return <React.Suspense fallback={<div>...loading...</div>}>
                            <DialogsContainer/>
                        </React.Suspense>
                    }}/>
                    <Route path={'/profile/:userId?'} render={() => {
                        return <React.Suspense fallback={<div>...loading...</div>}>
                            <ProfileContainer/>
                        </React.Suspense>
                    }}/>
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
const AppContainer = compose<ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (MapStateToProps, {getAppInitialized})
)
(App)

const SamuraiJsApp = () => {

    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>

    </BrowserRouter>
}

export default SamuraiJsApp