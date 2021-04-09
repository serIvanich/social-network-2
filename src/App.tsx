import React, { ReactNode } from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import {Music} from './components/Music/Music';
import {News} from "./components/News/News";
import {MyStateType} from "./myState/MyState";

type AppPropsType = {
    myState: MyStateType
}

export const App: React.FC< AppPropsType> = (props) => {
    return (<BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='wrapper-content'>
                    <Route exact path={'/dialogs'} render={() => <Dialogs dialogsPage={props.myState.dialogsPage} />} />
                    <Route path='/profile' render={ () => <Profile profilePage={props.myState.profilePage} />}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


