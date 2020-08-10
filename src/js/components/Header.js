import React, {Component} from "react";
import {FACEBOOK_AUTH_URL, HOST, HOST_BASE, WEB_URL, WEB_URL_API} from '../consts'
import {VK} from "react-vk"

import {CopyToClipboard} from 'react-copy-to-clipboard';
import FacebookLogin from 'react-facebook-login';


import '../main.js'


import axios from 'axios'
import Cookies from 'universal-cookie';
import {postRender} from "../main";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


const hostUserProfile = HOST + "/user-profile";
const hostRepost = HOST + "/repost";
// let subDomain = this.props.subDomain;
let isAuth = false;
const cookies = new Cookies();

async function getUser() {
    let userId = cookies.get('vk_userId');
    let url = hostUserProfile + '/getUserBySocialId' +
        '?userSocialId=' + userId + '&socialType=VK'
    console.log("url: " + url)
    let res = await axios.get(url)
    if (res.status === 200) {
        let userProfile = res.data;
        console.log("USER_PROFILE: ")
        console.log(userProfile)
        return userProfile;
    }
}

export async function getUserLink(subDomain) {
    //если перешел по короткой ссылке, нужна другая логика
    let userId = cookies.get('vk_userId');
    let url = hostRepost + '/getRepostOrSave' +
        '?socialId=' + userId + '&url=' + subDomain
    console.log("subDomain")
    console.log(subDomain)
    let res = await axios.get(url)
    if (res.status === 200) {
        let repost = res.data;
        console.log("repost: ")
        console.log(repost)
        return repost;
    }
}

export async function getUserLinkByUniqUrl(uniqUrl) {
    //если перешел по короткой ссылке, нужна другая логика
    console.log("получение по uniqUrl")
    let userId = cookies.get('vk_userId');
    let url = hostRepost + '/getRepostOrSaveByUniqUrl' +
        '?socialId=' + userId + '&uniqUrl=' + uniqUrl
    console.log("uniqUrl")
    console.log(url)
    let res = await axios.get(url)
    if (res.status === 200) {
        let repost = res.data;
        console.log("repost: ")
        console.log(repost)
        return repost;
    }
}


function checkStatus() {
    let currentUser = cookies.get('vk_userId');
    if (currentUser != null) {
        console.log("LOGGED")
        isAuth = true;
    } else {
        console.log("UNLOGGED")
        isAuth = false;
    }
    postRender();
    return isAuth;
}

const responseFacebook = (response) => {
    console.log(response);
}
const componentClicked = () => {
    console.log("clicked");
}

function authVKAction(data) {
    if (!isAuth) {
        cookies.set('startPage', window.location.host,
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });
        cookies.set('startUrl', window.location.pathname.substring(1),
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });
        let address = "https://oauth.vk.com/authorize" +
            "?client_id=7505819&" +
            "display=page" +
            "&" +
            `redirect_uri=http://${WEB_URL}/vkredirect` +
            "&" +
            "scope=wall" +
            "&response_type=code&v=5.110"
        console.log("authVKAction 1 " + isAuth)
        window.location.replace(address)
    } else {
        //сделать репост
        console.log("VK_REPOST");

        console.log("VK_REPOST:" + data);

        // let link = "http://linkme.club" + window.location.pathname
        let link = HOST_BASE + window.location.pathname
        // let img_link = "http://linkme.club" + window.location.pathname
        // "http://mydomainname.com/static/media/f-slider-1.db4ba8c6.jpg"

        let addr = "https://vk.com/share.php" +
            "?url=" +
            // window.location.href +
            link +
            "&title=" +
            data
        // "&image=" +
        // img_link
        window.open(addr)
        // .then(window.location = '/')
    }

}

function authFBAction(data) {
    console.log("FB_ACTION")
    if (!isAuth) {
        cookies.set('startPage', window.location.host,
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });
        cookies.set('startUrl', window.location.pathname.substring(1),
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });
        let address = FACEBOOK_AUTH_URL
        console.log("authVKAction 1 " + isAuth)
        window.location.replace(address)
    } else {
        //сделать репост
        console.log("FB_REPOST");

        console.log("FB_REPOST:" + data);

        // let link = "http://linkme.club" + window.location.pathname
        let link = HOST_BASE + window.location.pathname
        // let img_link = "http://linkme.club" + window.location.pathname
        // "http://mydomainname.com/static/media/f-slider-1.db4ba8c6.jpg"

        let addr = "https://vk.com/share.php" +
            "?url=" +
            // window.location.href +
            link +
            "&title=" +
            data
        // "&image=" +
        // img_link
        window.open(addr)
        // .then(window.location = '/')
    }

}


function logOut() {
    console.log("LOGOUT")
    // cookies.remove('vk_userId', {path: '/'});
    cookies.remove('vk_userId',
        {
            sameSite: 'none',
            domain: `.${WEB_URL}`
        });
    window.location.reload()
    // this.state.isAuth = false;
}

function cutHttp(str) {
    return String(str).substr('https://'.length)
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            data: [],
            userLink: [],
            snackOpen: false,

        }
    }


    async componentDidMount() {
        isAuth = checkStatus();
        let userLink;
        if (isAuth) {
            const userProfile = await getUser();
            this.setState({data: userProfile});
            console.log(this.state)
            if (this.props.path == null) {
                const res = await getUserLink(this.props.subDomain);
                userLink = res.uniqLink;
            } else {
                userLink = this.props.path;
            }
            let address = HOST_BASE + '/' + userLink
            this.setState({userLink: address})
            localStorage.setItem('userLink', userLink);

            if (this.props.path == null) {
                window.location.replace(address)
            }
        }
    }

    _handleSnackClose = () => {
        this.setState({
            snackOpen: false
        });
    }

    _handleSnackOpen = () => {
        this.setState({
            snackOpen: true
        });
    }

    render() {
        if (!isAuth) {
            return (
                <header className="header guest">
                    <div className="header-hover section">
                        <div className="header-hover__wrap">
                            <div className="header-hover__item">
                                <p className="header-hover__numb">1</p>
                                <p className="header-hover__desc">Войди и получи свою ссылку</p>
                            </div>
                            <div className="header-hover__img-wrap">
                                <img src={require("../../img/arrow-right-header-hover.png")} alt="Стрелка"
                                     className="header-hover__img"/>
                            </div>
                            <div className="header-hover__item">
                                <p className="header-hover__numb">2</p>
                                <p className="header-hover__desc">Отправь ссылку в сообщество или друзьям</p>
                            </div>
                            <div className="header-hover__img-wrap">
                                <img src={require("../../img/arrow-right-header-hover.png")} alt="Стрелка"
                                     className="header-hover__img"/>
                            </div>
                            <div className="header-hover__item">
                                <p className="header-hover__numb">3</p>
                                <p className="header-hover__desc">Получи деньги за продажу по твоей ссылке</p>
                            </div>
                        </div>
                    </div>

                    <div className="main-header section">
                        <div className="header__wrap-all">
                            <p className="header__desc">Поделись ссылкой и заработай на этом</p>
                            <div className="header__price-wrap">
                                <p className="header__price">{this.props.bonus}
                                </p><span className="header__rub">₽</span>
                            </div>
                            <ul className="header__social-list">
                                <li className="header__social-item">
                                    <a href="#" className="header__social-link">
                                        <img src={require("../../img/vk-color.png")} alt="Вк"
                                             className="header__social-img" onClick={authVKAction}
                                        /></a>
                                </li>
                                <li className="header__social-item">
                                    <a href="#" className="header__social-link">
                                        <img src={require("../../img/fb-color.png")}
                                             alt="Фейсбук"
                                             className="header__social-img"
                                             onClick={authFBAction}/></a>
                                </li>
                            </ul>
                            <a href="#" className="header__more">Узнать больше</a>
                            {/*<button className="hamburger hamburger-guest-js hamburger--minus" type="button">*/}
                            {/*    <span className="hamburger-box">*/}
                            {/*        <span className="hamburger-inner"/>*/}
                            {/*    </span>*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </header>
            )
        } else {
            // = getUser();
            return (
                <header className="header user">
                    <div>
                        <Snackbar open={this.state.snackOpen}
                                  autoHideDuration={3500}
                                  onClose={this._handleSnackClose}
                            // anchorOrigin={vertical: 'bottom', horizontal: 'center'}
                        >
                            <Alert onClose={this._handleSnackClose} severity="success">
                                Ссылка скопирована
                            </Alert>
                        </Snackbar>
                    </div>
                    <div className="header-hover section">
                        <div className="header-hover__wrap user-hover">
                            <div className="header-hover__item user-hover__item">
                                <div className="header-hover__desc user-hover__desc">
                                    <p>
                                        <button className="user-hover__copy"
                                                onClick={this._handleSnackOpen}
                                        >
                                            Кликни, чтобы скопировать
                                        </button>
                                    </p>
                                    <span className="user-hover__oror">или</span>
                                    {/*Поделись в соц. сетях*/}
                                    <p>
                                        <button className="user-hover__copy"
                                                onClick={() => authVKAction(this.props.title)}
                                        >
                                            Поделись в соц. сетях
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-header section">
                        <div className="header__wrap-all">
                            <div className="header__man-wrap">
                                {/*<img src={require("../../img/header-man.png")} alt="Аватар" className="header__man-img"/>*/}
                                <img src={this.state.data.userProfileImageLink} onClick={logOut} alt="Аватар"
                                     className="header__man-img"/>
                                <a href="#" className="header__logout">x</a>
                            </div>
                            <div className="user__desc-wrap">
                                <p className="header__desc">Заработай на этом</p>
                                <div className="header__price-wrap">
                                    {/*<p className="header__price">{this.state.data.bonus}</p><span*/}
                                    <p className="header__price">{this.props.bonus}</p><span
                                    className="header__rub">₽</span>
                                </div>
                            </div>
                            <div className="user__header-wrap-need">
                                <CopyToClipboard text={this.state.userLink}
                                                 onCopy={this._handleSnackOpen}
                                >
                                    <a href="#" className="header__site-link">{cutHttp(this.state.userLink)}</a>
                                </CopyToClipboard>
                                <ul className="header__social-list">
                                    <li className="header__social-item">
                                        <a href="#" className="header__social-link">
                                            <img src={require("../../img/vk-color.png")} alt="Вк"
                                                 className="header__social-img"
                                                 onClick={() => authVKAction(this.props.title)}/>
                                        </a>
                                    </li>
                                    {/*<li className="header__social-item">*/}
                                    {/*    <a href="#" className="header__social-link">*/}
                                    {/*        <img src={require("../../img/header-facebook.png")} alt="Фейсбук"*/}
                                    {/*             className="header__social-img"/>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                            <a href="#" className="header__more">Узнать больше</a>
                        </div>
                    </div>
                </header>)

        }

    }
}
