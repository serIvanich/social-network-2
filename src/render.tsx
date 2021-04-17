import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {StateType} from "./redux/MyState";
import {addDialogsText, addPost } from "./redux/MyState"


export const rerenderEntireTree = (state: StateType) => {

    ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App state={state} addPost={addPost} addDialogsText={addDialogsText}/>
                </BrowserRouter>
            </React.StrictMode>, document.getElementById('root'))
}

