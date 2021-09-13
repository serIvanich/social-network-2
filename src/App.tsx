import React, {ComponentType} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
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
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.getAppInitialized()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>

                        <Route path={'/dialogs'} render={() => {
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
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
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