import React, {Component} from "react";
import Cookies from "universal-cookie";

import {HOST, WEB_URL} from '../consts'

import axios from 'axios'

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
                domain:`.${WEB_URL}`
            });
        const url = cookies.get('startPage')

        //делаем запрос к вк для получения id клиента и access token
        let vkApiAddress = HOST + "vk/auth" + `?code=${code}`
        console.log(vkApiAddress)
        let res = await axios.get(vkApiAddress)
        if (res.status === 200) {
            console.log(res.status)
        }
        //получили access token и id пользователя
        //добавляем нового клиента (vk_id, image, etc...) (на бэке)

        //создаем новую запись в таблице с репостами

        //записываем его app_id в куки
        cookies.set('vk_userId', res.data.socialId,
            {
                sameSite: 'none',
                domain: `.${WEB_URL}`
            });
        //формируем новую запись в таблице с репостами
        //делаем редирект по уникальной ссылке
        console.log(url)
        window.location.replace("http://"  + url)
    }
    render() {
        return null
    }
}