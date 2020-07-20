import React, {useState} from 'react';
import {Component} from "react";
import {useHistory} from "react-router-dom";
import {withRouter} from "react-router";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from "material-ui/AppBar";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import axios from 'axios'
import {HOST, WEB_URL, WEB_URL_API} from '../../consts'
import ManagerPage from "../ManagerPage";


function handleClick(event, username, password, history) {
    var apiBaseUrl = HOST;
    var self = this;
    console.log("username")
    console.log(username)
    var payload = {
        "login": username,
        "password": password
    }
    axios.post(apiBaseUrl + 'manager/login', payload)
        .then(function (response) {
            console.log(response);
            // if (response.data.code === 200) {
            if (response.status === 200) {
                console.log("Login successfull");
                // var uploadScreen = [];
                // uploadScreen.push(<ManagerPage appContext={self.props.appContext}/>)
                // self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen})
                // const history = useHistory();
                history.push('/managerPage')
            } else if (response.status === 204) {
                console.log("Username password do not match");
                alert("username password do not match")
            } else {
                console.log("Username does not exists");
                alert("Username does not exist");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


const Login = () => {
    // const [username, setUsername, password, setPassword] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         username: '',
    //         password: ''
    //     }
    // }

    // render() {
    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Login"
                    />
                    <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username"
                        // onChange={(event, newValue) => setUsername({username: newValue})}
                        onChange={(event, newValue) => setUsername(newValue)}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        // onChange={(event, newValue) => setPassword({password: newValue})}
                        onChange={(event, newValue) => setPassword(newValue)}
                    />
                    <br/>
                    <RaisedButton label="Submit" primary={true} style={style}
                                  onClick={(event) => handleClick(event, username, password, history)}/>
                </div>
            </MuiThemeProvider>
        </div>
    );
    // }

}


const style = {
    margin: 15,
};
export default withRouter(Login);