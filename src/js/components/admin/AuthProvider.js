import {host_manager} from "../../consts";

const authProvider = {
    login: ({username, password}) => {
        const request = new Request(host_manager + '/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                // if (response.status < 200 || response.status >= 300) {
                if (response.status !== 200) {
                    // throw new Error(response.statusText);
                    throw new Error("Неверное имя пользователя или пароль");
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('username', username);
                localStorage.setItem('token', token); // The token is stored in the browser's local storage
                window.location.replace('/adminPage');
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: error => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    // ...
};

export default authProvider;