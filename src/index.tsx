import React from 'react';
import {StateType, state} from "./redux/state";

import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";


const rerenderEntireTree = () => {
    const state = state.getState()

    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} store={state}
                />
            </BrowserRouter>
        </React.StrictMode>, document.getElementById('root'))
}


rerenderEntireTree()

state.subscriber(rerenderEntireTree)




