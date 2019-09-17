import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Auth from "./Auth";

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <Auth/>
        </BrowserRouter>, document.getElementById('root'));
}
