import React, {Component} from 'react';
import {YMaps, Map, Placemark, withYMaps} from "react-yandex-maps";
import './css/plugins/swiper.css'
import './css/plugins/jquery.fancybox.min.css'
import './css/plugins/hamburgers.min.css'
import './css/normalize.css'
import './css/main.css'
import {styles} from "./css/styles";

import axios from 'axios'


import {host_adv, host_images, host_repost, host_user, WEB_URL_API} from './js/consts'
import Header from "./js/components/Header";
import {postRender} from "./js/main";


function checkAdv(props) {
    let url = host_adv + '/get/' + props.subDomain
    console.log("url: " + url)
    try {
        let res = axios.get(url)
        if (res.status === 200) {
            let adv = res.data;
            console.log("ADV: ")
            console.log(adv)
            return true;
        }
    } catch (e) {
        console.log("Error: ", e);
    }
    return false;
}

const mapData = {
    center: [55.751226, 37.618549],
    zoom: 15,
};


export default class App extends Component {

    state = {
        isLoading: true,
        content: [],
        url: "",
        numbersSlider: [],
        coordinates: [],
        mapData: []
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (this.props.subDomain != null || this.props.path != null) {
            console.log("запрашиваем контент")
            //Проверяем тип ссылки
            let addr
            let urlForState
            if (this.props.subDomain) {
                addr = host_adv + '/getContent/' + this.props.subDomain;
                this.setState({url: this.props.subDomain});
                urlForState = this.props.subDomain;

            } else if (this.props.path) {
                addr = host_adv + '/getContentByUniqUrl/' + this.props.path;
                //получить по короткому url оригинальную ссылку
                let reqAddr = host_adv + '/getUrlByUniqUrl/' + this.props.path;
                await axios.get(reqAddr).then(res => {
                    urlForState = res.data;
                    console.log("urlForState: " + urlForState);
                    this.setState({url: urlForState});
                })
            }
            //получаем контент
            axios.get(addr)
                .then(res => {
                    console.log("res1")
                    //////////
                    console.log(res.data)
                    this.setState({content: res.data})
                    this.setState({isLoading: false})

                    let crdnts = res.data.coordinates.split(",").map(value => parseFloat(value))
                    this.setState({coordinates: [crdnts]})

                    let mapData = {
                        center: crdnts,
                        zoom: 15,
                    };
                    this.setState({mapData: mapData})
                    console.log("1111")
                    console.log(this.state.coordinates)
                }).catch(reason => {
                console.log("Unknown object")
            });

            //todo продумать порядок получения
            if (urlForState) {
                await axios.get(host_images + "/getAllNumberSliderPhotos?"
                    + "url=" + urlForState).then(value => {
                    console.log("NUMBER SLIDER: ")
                    console.log(value.data)
                    this.setState({numbersSlider: value.data})
                })

            }
            postRender();
        }

    }


    render() {
        console.log("RENDER---------------")
        if (this.state.isLoading === false) {
            return (
                <div className="App">
                    {/*-------------------------------------*/}
                    <Header
                        subDomain={this.props.subDomain}
                        path={this.props.path}
                        bonus={this.state.content.bonus}
                        title={this.state.content.headTop}
                    />
                    <div className="space__head-wrap">
                        <div className="space__head"/>
                    </div>
                    <section className="heading"
                             style={{
                                 backgroundImage: "url(" + host_images + `/downloadHeaderPhoto?url=${this.state.url}` + ")"
                             }}>
                        <h1 className="heading__title">{this.state.content.headTop}</h1>
                    </section>

                    <div className="modal-window" id="modal-window">
                        <div className="modal-window__wrap">
                            <form className="modal-window__form">
                                <div className="modal-window__item-wrap">
                                    <label htmlFor="modal-name" className="modal-window__label">Ваше имя</label>
                                    <div className="modal-window__rielt-wrap">
                                        <input className="modal-window__input" placeholder="Андрей" type="text"
                                               name="modal-name"
                                               id="modal-name"/>
                                        <label className="container-checkbox1 modal-window__item-check">Я риелтор
                                            <input type="checkbox"/>
                                            <span className="checkmark"/>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-window__item-wrap modal-window__item-numb">
                                    <label form="modal-tel" className="modal-window__label">Ваш телефон</label>

                                    <div className="modal-window__numb-wrap">
                                        <input className="modal-window__input modal-window__input-js"
                                               placeholder="+7 (___) ___-__-__"
                                               type="tel" name="modal-tel" id="modal-tel"/>
                                        <p className="modal-window__tel-desc">Вводите свой номер телефон и
                                            получите
                                            номер
                                            телефона продавца
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-window__item-wrap modal-window__item-sell">
                                    <label className="modal-window__label">Телефон продавца</label>
                                    <div className="modal-window__sell-wrap">
                                        <div className="modal-window__sell-item"> +7</div>
                                        <div className="modal-window__sell-item active"> 9</div>
                                        <div className="modal-window__sell-item active"> 6</div>
                                        <div className="modal-window__sell-item active"> 2</div>
                                        <div className="modal-window__sell-item active"> 2</div>
                                        <div className="modal-window__sell-item active"> 6</div>
                                        <div className="modal-window__sell-item active"> 5</div>
                                        <div className="modal-window__sell-item active"> 4</div>
                                        <div className="modal-window__sell-item active"> 0</div>
                                        <div className="modal-window__sell-item active"> 8</div>
                                        <div className="modal-window__sell-item active"> 1</div>
                                    </div>
                                </div>
                                <div className="modal-window__item-wrap modal-window__item-wrap-btn">
                                    <button type="submit" className="modal-window__btn">Отправить свои данные</button>
                                    <p className="modal-window__btn-desc">Нажимая на кнопку отправить, Вы даете
                                        согласие на обработку персональных данных</p>
                                </div>
                            </form>
                        </div>
                    </div>

                    <section className="section about-link">
                        <ul className="about-link__list">
                            <li className="about-link__item">
                                <a href="#" className="about-link__link">Фото объекта</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" className="about-link__link">Описание</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" className="about-link__link">О комплексе</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" className="about-link__link">Местоположение</a>
                            </li>
                            <li className="about-link__item about-link__border">
                                <a className="about-link__link">Заработай на продаже объекта</a>
                            </li>
                        </ul>
                    </section>

                    <section className="photo-obj">
                        <h2 className="section__title">Фото</h2>

                        <div className="swiper-container photo-obj-swiper">
                            {sliderTop(this.state.numbersSlider.slider1Count, this.state.url)}
                            {/*<div className="swiper-wrapper">*/}
                            {/*    <div className="swiper-slide photo-obj__slide">*/}
                            {/*        <div className="photo-obj__img-wrap">*/}
                            {/*            <img src={require('./img/f-slider-1.jpg')} alt="Фото объекта"*/}
                            {/*                 className="photo-obj__img"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="photo-obj__desc-wrap">*/}
                            {/*            <div className="photo-obj__desc">*/}
                            {/*                <div className="photo-obj__desc-text">*/}
                            {/*                    <p>Панорамные окна высотой 3,2 м</p>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="swiper-slide photo-obj__slide">*/}
                            {/*        <div className="photo-obj__img-wrap">*/}
                            {/*            <img src={require('./img/holder_slider.jpg')} alt="Фото объекта"*/}
                            {/*                 className="photo-obj__img"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="photo-obj__desc">*/}
                            {/*            <div className="photo-obj__desc-text">*/}
                            {/*                <p>Панорамные окна высотой 3,2 м</p>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="swiper-pagination"/>
                        </div>
                    </section>
                    <section className="flat-desc">
                        <div className="section">
                            <div className="flat-desc__wrap-all">
                                <div className="flat-desc__img-human">
                                    <div className="flat-desc__img-wrap">
                                        {/*<img src={require('./img/human.jpg')} alt="Картинка продавца"*/}
                                        <img src={host_images + `/downloadBrokerPhoto?url=${this.state.url}`} alt="Картинка продавца"
                                             className="flat-desc__img"/>
                                    </div>
                                    <p className="flat-desc__about-human">
                                        {this.state.content.brokerInfo ? this.state.content.brokerInfo.name : ""}
                                        <span className="flat-desc__desc-human">
                                            {this.state.content.brokerInfo ? this.state.content.brokerInfo.comment : ""}
                                        </span>
                                    </p>
                                </div>
                                <div className="flat-desc__main-desc">
                                    <p className="flat-desc__header">
                                        {this.state.content.descHead}
                                    </p>
                                    <span className="flat-desc__paragraph">
                                        {textFormatter(this.state.content.description)}
                                    </span>
                                </div>
                                <div className="flat-desc__price">
                                    <p className="flat-desc__price-text">
                                        {this.state.content.price}
                                        <span className="flat-desc__mortgage">{this.state.content.priceComment}</span>
                                    </p>
                                    <a href="#modal-window" data-fancybox="modal-window"
                                       className="flat-desc__btn-contact">Связаться с продавцом</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="about-comp">
                        <h2 className="section__title">О комплексе</h2>
                        <div className="swiper-container about-comp-swiper">
                            {slider(this.state.numbersSlider.slider2Count, this.state.url)}
                            <div className="swiper-button-prev about-comp-prev"/>
                            <div className="swiper-button-next about-comp-next"/>
                        </div>
                        <ul className="section about-comp__desc-list">
                            {bulletFormatter(this.state.content.bullets)}
                        </ul>
                    </section>
                    <section className="location">
                        <div className="section__title">Расположение</div>
                        <YMaps style={styles.YMaps}>
                            <Map defaultState={this.state.mapData} className="location__map-wrap">
                                {this.state.coordinates.map(coordinate => <Placemark geometry={coordinate}/>)}
                            </Map>
                        </YMaps>
                    </section>
                    <footer className="section footer">
                        <div className="footer__wrap">
                            <div className="footer__two-colums">
                                <div className="footer__colum">
                                    <a href="" className="footer__logo">
                                        <div className="footer__img-wrap"><img
                                            src={require('./img/landing/logo.png')}
                                            alt="Логотип сайта"
                                            className="footer__img"/></div>
                                        <p className="footer__service">Сервис распространения объявлений</p>
                                    </a>
                                    <p className="footer__paragraph footer__copyright">
                                        LinkMe Club © Copyright 2020
                                    </p>
                                </div>
                                <div className="footer__colum">
                                    <ul className="footer__list">
                                        <li className="footer__item-list">
                                            <a href="" className="footer__item-link">О проекте</a>
                                        </li>
                                        <li className="footer__item-list">
                                            <a href="" className="footer__item-link">Все объявления</a>
                                        </li>
                                        <li className="footer__item-list">
                                            <a href="" className="footer__item-link">Помощь</a>
                                        </li>
                                        <li className="footer__item-list">
                                            <a href="" className="footer__item-link">Контакты</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer__two-colums">
                                <div className="footer__colum footer__political">
                                    <div className="footer__socials">
                                        <a href="#" className="footer__social">
                                            <img src={require("./img/social-telegram.png")}
                                                 alt="Иконка телеграмма"
                                                 className="footer__social-img"/>
                                        </a>
                                        <a href="#" className="footer__social">
                                            <img src={require("./img/social-inst.png")} alt="Иконка ins"
                                                 className="footer__social-img"/>
                                        </a>
                                        <a href="#" className="footer__social">
                                            <img src={require("./img/social-facebook.png")} alt="Иконка fb"
                                                 className="footer__social-img"/>
                                        </a>
                                    </div>
                                    <a href="#" className="footer__political">Политика конфиденциальности</a>
                                </div>
                                <div className="footer__colum footer__last">
                                    <a href="#" className="footer__quest">Задать вопрос</a>
                                    <a className="footer__link-mail"
                                       href="mailto:info@site-project.ru">info@linkme.club</a>
                                    <a href="#" className="footer__circs">Условия использования</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                    }
                </div>
            );
        } else {
            return null;
        }

    }
}

function textFormatter(text) {
    console.log("textFormatter")
    console.log(text)
    return (
        <div>
            {text.split('\\n').map((i, key) => {
                return <span key={key}>{i} <br/></span>;
            })}
        </div>);
}


function bulletFormatter(text) {
    console.log("bulletFormatter")
    console.log(text)
    return (
        <div>
            <li className="about-comp__desc-item-wrap">
                {text.split('|').map((i, key) => {
                    console.log(i + ": " + key)
                    // return <p key={key}>{i}</p>;
                    return <div key={key} className="about-comp__desc-item">{i}</div>

                })}
            </li>
        </div>);
}

function slider(count, url) {
    const items = []
    console.log("SLIDER " + count)
    for (let i = 0; i < count; i++) {
        let addr = host_images + `/downloadSliderPhoto?url=${url}&type=slider2&index=${i}`
        items.push(<div className="swiper-slide">
            <div className="photo-obj__img-wrap">
                <img src={addr}
                     alt="Фото комплекса"
                     className="photo-obj__img"/>
            </div>
        </div>)
    }
    return (
        <div className="swiper-wrapper">
            {items}
        </div>
    )
}

function sliderTop(count, url) {
    const items = []
    console.log("SLIDER " + count)
    for (let i = 0; i < count; i++) {
        let addr = host_images + `/downloadSliderPhoto?url=${url}&type=slider1&index=${i}`
        items.push(<div className="swiper-slide">
            <div className="photo-obj__img-wrap">
                <img src={addr}
                     alt="Фото комплекса"
                     className="photo-obj__img"/>
            </div>
            <div className="photo-obj__desc">
                <div className="photo-obj__desc-text">
                    <p>Панорамные окна высотой 3,2 м</p>
                </div>
            </div>
        </div>)
    }
    return (
        <div className="swiper-wrapper">
            {items}
        </div>
    )
}
