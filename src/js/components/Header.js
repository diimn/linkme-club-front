import React, {Component} from "react";
import {HOST, WEB_URL} from '../consts'

import '../main.js'


import axios from 'axios'
import Cookies from 'universal-cookie';


const hostUserProfile = HOST + "user-profile";
const hostRepost = HOST + "repost";
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

async function getUserLink(props) {
    let subDomain = props.subDomain
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


function checkStatus() {
    let currentUser = cookies.get('vk_userId');
    if (currentUser != null) {
        console.log("LOGGED")
        isAuth = true;
    } else {
        console.log("UNLOGGED")
        isAuth = false;
    }
    return isAuth;
}

function authVKAction() {
    cookies.set('startPage', window.location.host,
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
}


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userLink: []
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
                const res = await getUserLink(this.props);
                userLink = res.uniqLink;
            } else {
                userLink = this.props.path;
            }
            let address = 'http://' + WEB_URL + '/' + userLink
            this.setState({userLink: address})

            if (this.props.path == null) {
                window.location.replace(address)
            }
        }

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
                                <p className="header__price">500 000
                                </p><span className="header__rub">₽</span>
                            </div>
                            <ul className="header__social-list">
                                <li className="header__social-item">
                                    <a href="#" className="header__social-link">
                                        <img src={require("../../img/header-vk.png")} alt="Вк"
                                             className="header__social-img" onClick={authVKAction}
                                        /></a>
                                </li>
                                <li className="header__social-item">
                                    <a href="#" className="header__social-link">
                                        <img src={require("../../img/header-facebook.png")}
                                             alt="Фейсбук"
                                             className="header__social-img"/></a>
                                </li>
                            </ul>
                            <a href="#" className="header__more">Узнать больше</a>
                            <button className="hamburger hamburger-guest-js hamburger--minus" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"/>
                                </span>
                            </button>
                        </div>
                    </div>
                </header>
            )
        } else {
            // = getUser();
            return (
                <header className="header user">
                    <div className="header-hover section">
                        <div className="header-hover__wrap user-hover">
                            <div className="header-hover__item user-hover__item">
                                <div className="header-hover__desc user-hover__desc">
                                    <p>
                                        <button className="user-hover__copy">Кликни, чтобы скопировать</button>
                                    </p>
                                    <span className="user-hover__oror">или</span>
                                    Поделись в соц. сетях
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-header section">
                        <div className="header__wrap-all">
                            <div className="header__man-wrap">
                                {/*<img src={require("../../img/header-man.png")} alt="Аватар" className="header__man-img"/>*/}
                                <img src={this.state.data.userProfileImageLink} alt="Аватар"
                                     className="header__man-img"/>
                                <a href="#" className="header__logout">x</a>
                            </div>
                            <div className="user__desc-wrap">
                                <p className="header__desc">Заработай на этом</p>
                                <div className="header__price-wrap">
                                    {/*<p className="header__price">{this.state.data.bonus}</p><span*/}
                                    <p className="header__price">500000</p><span
                                    className="header__rub">₽</span>
                                </div>
                            </div>
                            <div className="user__header-wrap-need">
                                <a href="#" className="header__site-link">{this.state.userLink}</a>
                                <ul className="header__social-list">
                                    <li className="header__social-item">
                                        <a href="#" className="header__social-link">
                                            <img src={require("../../img/header-vk.png")} alt="Вк"
                                                 className="header__social-img" onClick={authVKAction}/>
                                        </a>
                                    </li>
                                    <li className="header__social-item">
                                        <a href="#" className="header__social-link">
                                            <img src={require("../../img/header-facebook.png")} alt="Фейсбук"
                                                 className="header__social-img"/>
                                        </a>
                                    </li>
                                </ul>
                                <button className="hamburger hamburger-user-js hamburger--minus" type="button">
<span className="hamburger-box">
<span className="hamburger-inner"></span>
</span>
                                </button>
                            </div>
                            <a href="#" className="header__more">Узнать больше</a>
                        </div>
                    </div>
                </header>)

        }

    }
}
