import React, {Component} from "react";
import Cookies from "universal-cookie";

import {HOST, WEB_URL, WEB_URL_API} from '../consts'

import axios from 'axios'
import {getUserLink, getUserLinkByUniqUrl} from "./Header";

const cookies = new Cookies();

export default class VKRedirect extends Component {

    async componentDidMount() {
        console.log("History")
        console.log(this.props)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        cookies.set('vkCode', code,
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });

        //делаем запрос к вк для получения id клиента и access token
        let vkApiAddress = HOST + "/vk/auth" + `?code=${code}`
        console.log(vkApiAddress)
        let res = await axios.get(vkApiAddress)
        if (res.status === 200) {
            console.log(res.status)
        }
        //получили access token и id пользователя
        //записываем его app_id в куки
        cookies.set('vk_userId', res.data.socialId,
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });

        const url = cookies.get('startPage')
        console.log("URL VK AUTH: " + url)

        let advUrl = url.substring(0, url.indexOf(WEB_URL) - 1)
        let resUserLink
        //создаем новую запись в таблице с репостами
        if (advUrl) {
            console.log(advUrl)
            resUserLink = await getUserLink(advUrl);
        } else {
            advUrl = cookies.get('startUrl')
            resUserLink = await getUserLinkByUniqUrl(advUrl)
        }

        //формируем новую запись в таблице с репостами
        //делаем редирект по уникальной ссылке
        advUrl = WEB_URL + "/" + resUserLink.uniqLink

        console.log("redirect url: " + advUrl)
        //todo
        window.location.replace("http://" + advUrl)
    }

    render() {
        return null
    }
}