import React, {Component} from "react";
import Cookies from "universal-cookie";

import {APP_SECRET, FACEBOOK_APP_ID, FB_API, HOST, host_user, PROTOCOL, WEB_URL, WEB_URL_API} from '../consts'

import axios from 'axios'
import {getUserLink, getUserLinkByUniqUrl} from "./Header";

const cookies = new Cookies();

export default class FBRedirect extends Component {

    async componentDidMount() {
        console.log("History")
        console.log(this.props)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        let accessToken;
        cookies.set('fbCode', code,
            {
                sameSite: 'none',
                secure: true,
                domain: `.${WEB_URL}`
            });

        //делаем запрос к вк для получения id клиента и access token
        /*
        * https://graph.facebook.com/v8.0/oauth/access_token?
   client_id={app-id}
   &redirect_uri={redirect-uri}
   &client_secret={app-secret}
   &code={code-parameter}
        * */
        // let fbApiAddress = HOST + "/vk/auth" + `?code=${code}`
        let fbApiAddress = FB_API + `v8.0/oauth/access_token?`
            + `client_id=${FACEBOOK_APP_ID}`
            + `&redirect_uri=https://${WEB_URL}/fbredirect`
            + `&client_secret=${APP_SECRET}`
            + `&code=${code}`
        console.log(fbApiAddress)
        let res = await axios.get(fbApiAddress)
        if (res.status === 200) {
            console.log("access_token")
            accessToken = res.data.access_token
            console.log(accessToken)
            cookies.set('fbAccessToken', accessToken,
                {
                    sameSite: 'none',
                    secure: true,
                    domain: `.${WEB_URL}`
                });
            let getIdAddr = FB_API + `me?access_token=${accessToken}`
            let resId = await axios.get(getIdAddr)
            if (resId.status === 200) {
                console.log("id: ")
                console.log(resId.data)
                //получаем ссылку на картинку и сохраняем в бд
                //отправляем пользователя на бэк
                let userUrl = host_user + '/save' +
                    '?socialId=' + resId.data.id +
                    '&socialType=' + 'FB' +
                    '&userName=' + resId.data.name +
                    '&imageLink=' + FB_API + resId.data.id + '/' + 'picture?type=large' +
                    '&accessToken=' + accessToken
                let resSaveUser = await axios.get(userUrl)

                if (resSaveUser.status === 200) {
                    //записываем его app_id в куки
                    cookies.set('fb_userId', resId.data.id,
                        {
                            sameSite: 'none',
                            secure: true,
                            domain: `.${WEB_URL}`
                        });

                    const url = cookies.get('startPage')
                    console.log("URL FB AUTH: " + url)

                    let advUrl = url.substring(0, url.indexOf(WEB_URL) - 1)
                    console.log(advUrl)
                    let resUserLink
                    //создаем новую запись в таблице с репостами
                    if (advUrl) {
                        console.log("Получаем по субдомену")
                        resUserLink = await getUserLink(advUrl);
                    } else {
                        console.log("Получаем по уникальной ссылке")
                        advUrl = cookies.get('startUrl')
                        resUserLink = await getUserLinkByUniqUrl(advUrl)
                    }
                    //формируем новую запись в таблице с репостами
                    //делаем редирект по уникальной ссылке
                    advUrl = WEB_URL + "/" + resUserLink.uniqLink
                    console.log("redirect url: " + advUrl)
                    window.location.replace(PROTOCOL + advUrl)
                }
            }
        }
    }

    render() {
        return null
    }
}