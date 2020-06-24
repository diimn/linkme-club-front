import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import LandingPage from "./js/components/LandingPage";
import VKRedirect from "./js/components/VKRedirect";

var hist = createBrowserHistory();

const parsedData = window.location.host.split(".");
const path = window.location.pathname;
console.log("parsedData: " + parsedData)
const domain = parsedData[parsedData.length - 1]
console.log(domain)
if (parsedData.length >= 3) {
    const subDomain = parsedData[0];
    ReactDOM.render(
        <App subDomain={subDomain}/>, document.getElementById('root')
    );
} else if (path != null && path.length > 1 && !path.includes("vkredirect")) {
    // let isExists = checkIsExists();
    console.log("path: " + path);
    // console.log("isExists: " + isExists);
    ReactDOM.render(
        <App path={path}/>, document.getElementById('root')
    );
} else {
    ReactDOM.render(
        <Router history={hist}>
            <Switch>
                {/*<Route path="/landing-page" component={LandingPage} />*/}
                {/*<Route path="/profile-page" component={ProfilePage} />*/}
                <Route path="/vkredirect" component={VKRedirect}/>
                <Route path="/" component={LandingPage}/>
            </Switch>
        </Router>
        , document.getElementById("root")
    )
}
serviceWorker.unregister();
