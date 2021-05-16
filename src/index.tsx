import React from 'react';


import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import  store  from './redux/store';
import {Provider} from "react-redux";


const rerenderEntireTree = () => {


    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>

            </BrowserRouter>
        </React.StrictMode>, document.getElementById('root'))
}


rerenderEntireTree()

store.subscribe(rerenderEntireTree)




