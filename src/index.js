import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";

import * as serviceWorker from './serviceWorker';
import LandingPage from "./js/components/LandingPage";
import VKRedirect from "./js/components/VKRedirect";
// import Login from "./js/components/login/Login";
import ManagerPage from "./js/components/ManagerPage";
import AdminPage from "./js/components/admin/AdminPage";
import FBRedirect from "./js/components/FBRedirect";
// import LandingPageMain from "./js/components/LandingPageMain";

var hist = createBrowserHistory();

const parsedData = window.location.host.split(".");
const path = window.location.pathname.substring(1);
console.log("parsedData: " + parsedData)
const domain = parsedData[parsedData.length - 1]
console.log(domain)

//Если есть субдомен(перешли по исходной ссылке)
if (parsedData.length >= 3) {
    const subDomain = parsedData[0];
    ReactDOM.render(
        <App subDomain={subDomain}/>, document.getElementById('root')
    );
    // если перешли по короткой ссылке, исключая служебные
} else if (path != null && path.length > 1
    && !path.includes("vkredirect")
    && !path.includes("fbredirect")
    && !path.includes("login")
    && !path.includes("managerPage")
    && !path.includes("adminPage")
    && !path.includes("test")
) {
    console.log("path: " + path);
    ReactDOM.render(
        <App path={path}/>, document.getElementById('root')
    );
    //обработка служебных ссылок и заглавной страницы
} else {
    ReactDOM.render(
        <Router history={hist}>
            <Switch>
                {/*<Route path="/login" component={Login}/>*/}
                <Route path="/managerPage" component={ManagerPage}/>
                <Route path="/adminPage" component={AdminPage}/>
                {/*<Route path="/profile-page" component={ProfilePage} />*/}
                <Route path="/vkredirect" component={VKRedirect}/>
                <Route path="/fbredirect" component={FBRedirect}/>
                <Route path="/" component={LandingPage}/>
            </Switch>
        </Router>
        , document.getElementById("root")
    )
}
serviceWorker.unregister();
