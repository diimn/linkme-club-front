import React, {Component} from 'react';
import './css/plugins/swiper.css'
import './css/plugins/jquery.fancybox.min.css'
import './css/plugins/hamburgers.min.css'
import './css/normalize.css'
import './css/main.css'
// import './js/main.js'

import axios from 'axios'
// import {Header} from "./js/components/Header";

import {HOST, WEB_URL} from './js/consts'
import Header from "./js/components/Header";

const host_user = HOST + "user-profile";
const host_adv = HOST + "adv";
const host_repost = HOST + "repost";

// let subDomain = this.props.subDomain

function someAction(text) {
    console.log("SOME_ACTION " + text);
}

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

function checkIsExists() {
    var xhr = new XMLHttpRequest();
    // const response = await axios.get('http://localhost:5000/api/v1/adv/get/test-flat');
    // const isExists = response.data
    xhr.open('GET', 'http://localhost:5000/api/v1/adv/get/test-flat', false)
    xhr.send();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            // обработать ошибку
            console.log("Error1");
            alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        } else {
            // вывести результат
            console.log("Error2");
            return xhr.responseText; // responseText -- текст ответа.

        }
    }
}


export default class App extends Component {
// const App = () => {
    // useScript('https://unpkg.com/react@16/umd/react.development.js');
    // useScript('https://unpkg.com/react-dom@16/umd/react-dom.development.js');

    // useScript('./js/plugins/swiper.min.js');
    // useScript('main.js');
    // useScript('./js/plugins/lazyload.min.js');
    // useScript('./js/plugins/jquery.fancybox.min.js');
    // useScript('./js/main.js');
    // useScript('./js/main.js');
    state = {
        isLoading: true,
        content: []
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        //проверить есть ли в бд такое объявление если есть - выводить, нет - выводим заглавную страницу
        if (this.props.subDomain != null) {
            let url = host_adv + '/get/' + this.props.subDomain
            axios.get(url)
                .then(res => {
                    console.log("res")
                    console.log(res)
                    this.setState({isLoading: false})
                }).catch(reason => {
                console.log("Unknown object")
                // window.location.replace("http://" + WEB_URL)
            })
        }
        else if (this.props.path != null) {
            //////////
            let uniqUrl = this.props.path.substring(1)
            let url = host_repost + '/findByUniqUrl?url=' + uniqUrl
            this.setState({isLoading: false})
            // axios.get(url)
            //     .then(res => {
            //         //////////
            //         console.log(res)
            //         console.log("res")
            //         this.setState({isLoading: false})
            //     }).catch(reason => {
            //     console.log("Unknown object")
            //     // window.location.replace("http://" + WEB_URL)
            // })
        }

    }
        // scrMap.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A00912d2f65c6debed543efea92fc70f8f0098edd7878071b18d550dc3cc2a784&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=true";
    render() {
        if (this.state.isLoading === false) {
            return (
                <div className="App">
                    {/*-------------------------------------*/}
                    <Header subDomain={this.props.subDomain} path={this.props.path}/>
                    <div className="space__head-wrap">
                        <div className="space__head"/>
                    </div>
                    <section className="heading">
                        <h1 className="heading__title">Продажа квартиры<br/>в историческом районе</h1>
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

                                        <label className="container-checkbox1 modal-window__item-check">Я
                                            риелтор
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

                                        <div className="modal-window__sell-item">
                                            +7
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            9
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            6
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            2
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            2
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            6
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            5
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            4
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            0
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            8
                                        </div>
                                        <div className="modal-window__sell-item active">
                                            1
                                        </div>

                                    </div>
                                </div>

                                <div className="modal-window__item-wrap modal-window__item-wrap-btn">
                                    <button type="submit" className="modal-window__btn">Отправить свои данные
                                    </button>
                                    <p className="modal-window__btn-desc">Нажимая на кнопку отправить Вы даете
                                        согласие
                                        на
                                        обработку
                                        персональных
                                        данных</p>
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
                        <h2 className="section__title">Фото объекта</h2>

                        <div className="swiper-container photo-obj-swiper">

                            <div className="swiper-wrapper">
                                <div className="swiper-slide photo-obj__slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/f-slider-1.jpg')} alt="Фото объекта"
                                             className="photo-obj__img"/>
                                    </div>
                                    <div className="photo-obj__desc-wrap">
                                        <div className="photo-obj__desc">
                                            <div className="photo-obj__desc-text">
                                                <p>Панорамные окна высотой 3,2 м</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide photo-obj__slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/holder_slider.jpg')} alt="Фото объекта"
                                             className="photo-obj__img"/>
                                    </div>
                                    <div className="photo-obj__desc">
                                        <div className="photo-obj__desc-text">
                                            <p>Панорамные окна высотой 3,2 м</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide photo-obj__slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/holder_slider.jpg')} alt="Фото объекта"
                                             className="photo-obj__img"/>
                                    </div>
                                    <div className="photo-obj__desc">
                                        <div className="photo-obj__desc-text">
                                            <p>Панорамные окна высотой 3,2 м</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide photo-obj__slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/holder_slider.jpg')} alt="Фото объекта"
                                             className="photo-obj__img"/>
                                    </div>
                                    <div className="photo-obj__desc">
                                        <div className="photo-obj__desc-text">
                                            <p>Панорамные окна высотой 3,2 м</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide photo-obj__slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/holder_slider.jpg')} alt="Фото объекта"
                                             className="photo-obj__img"/>
                                    </div>
                                    <div className="photo-obj__desc">
                                        <div className="photo-obj__desc-text">
                                            <p>Панорамные окна высотой 3,2 м</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"/>
                        </div>
                    </section>

                    <section className="flat-desc">
                        <div className="section">
                            <div className="flat-desc__wrap-all">
                                <div className="flat-desc__img-human">
                                    <div className="flat-desc__img-wrap">
                                        <img src={require('./img/human.jpg')} alt="Картинка продавца"
                                             className="flat-desc__img"/>
                                    </div>

                                    <p className="flat-desc__about-human">
                                        Светлана Горбунова (La Prima Estate)
                                        <span className="flat-desc__desc-human">брокер объекта</span>
                                    </p>
                                </div>

                                <div className="flat-desc__main-desc">
                                    <p className="flat-desc__header">
                                        Квартира с красивым видом
                                    </p>

                                    <p className="flat-desc__paragraph">
                                        Великое дело, главный труд жизни.
                                    </p>

                                    <p className="flat-desc__paragraph">
                                        Самое значимое и эпохальное творение человека в искусстве, науке или
                                        любой
                                        другой
                                        сфере
                                        деятельности. Клубный дом Magnum на Усачева, 9 в Хамовниках - это новое
                                        явление,
                                        которое,
                                        несомненно, окажет влияние на сферу московской недвижимости
                                        премиум-класса,
                                        новое
                                        слово
                                        в
                                        сегменте.
                                    </p>

                                    <p className="flat-desc__paragraph">
                                        Концептуальный и эксклюзивный проект, свободный от условностей. Этот дом
                                        цепляет
                                        и
                                        внешним
                                        видом.
                                    </p>

                                    <p className="flat-desc__paragraph">
                                        Нетипичная для района архитектура, особый характер: темный камень,
                                        необычная
                                        фактура,
                                        металл и
                                        стекло - брутальное и строгое здание, но с собственной харизмой и
                                        индивидуальностью.
                                    </p>

                                </div>

                                <div className="flat-desc__price">
                                    <p className="flat-desc__price-text">
                                        105 000 000 руб.

                                        <span className="flat-desc__mortgage">Возможна покупка в ипотеку</span>
                                    </p>

                                    <a href="#modal-window" data-fancybox="modal-window"
                                       className="flat-desc__btn-contact">Связаться
                                        с
                                        продавцом</a>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="about-comp">
                        <h2 className="section__title">О комплексе</h2>

                        <div className="swiper-container about-comp-swiper">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="about-comp__img-wrap">
                                        <img src={require('./img/s-slider-1.jpg')} alt="Фото комплекса"
                                             className="about-comp__img"/>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="photo-obj__img-wrap">
                                        <img src={require('./img/f-slider-1.jpg')} alt="Фото комплекса"
                                             className="photo-obj__img"/>
                                    </div>
                                </div>
                            </div>

                            <div className="swiper-button-prev about-comp-prev"/>
                            <div className="swiper-button-next about-comp-next"/>

                        </div>

                        <ul className="section about-comp__desc-list">
                            {/*<li className="about-comp__desc-item-wrap">*/}
                            {/*    <div className="about-comp__desc-item">*/}
                            {/*        2 км от Кремля*/}
                            {/*    </div>*/}
                            {/*    <div className="about-comp__desc-item">*/}
                            {/*        Закрытая территория*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                            {/*<li className="about-comp__desc-item-wrap">*/}
                            {/*    <div className="about-comp__desc-item">*/}
                            {/*        Всего 20 квартир*/}
                            {/*    </div>*/}
                            {/*    <div className="about-comp__desc-item">*/}
                            {/*        Подземный паркинг*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                        </ul>
                    </section>
                    {/*        </div>*/}
                    {/*</section>*/}

                    <section className="location">
                        <div className="section__title">Расположение</div>
                        <div className="location__map-wrap">
                            <script type="text/javascript" charSet="utf-8" async
                                    src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A00912d2f65c6debed543efea92fc70f8f0098edd7878071b18d550dc3cc2a784&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=true">
                            </script>
                        </div>
                    </section>

                    <footer className="section footer">
                        <div className="footer__wrap">

                            <div className="footer__two-colums">

                                <div className="footer__colum">
                                    <a href="" className="footer__logo">
                                        <div className="footer__img-wrap"><img
                                            src={require('./img/holder-logo.png')}
                                            alt="Логотип сайта"
                                            className="footer__img"/></div>
                                        <p className="footer__service">Сервис распространения объявлений</p>
                                    </a>

                                    <p className="footer__paragraph footer__copyright">
                                        Logo © Copyright 2020
                                    </p>
                                </div>

                                <div className="footer__colum">

                                    <ul className="footer__list">
                                        <li className="footer__item-list"><a href=""
                                                                             className="footer__item-link">О
                                            проекте</a>
                                        </li>
                                        <li className="footer__item-list"><a href=""
                                                                             className="footer__item-link">Все
                                            объявления</a>
                                        </li>
                                        <li className="footer__item-list"><a href=""
                                                                             className="footer__item-link">Помощь</a>
                                        </li>
                                        <li className="footer__item-list"><a href=""
                                                                             className="footer__item-link">Контакты</a>
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
                                       href="mailto:info@site-project.ru">info@site-project.ru</a>

                                    <a href="#" className="footer__circs">Условия использования</a>
                                </div>

                            </div>
                        </div>
                    </footer>

                    {/*<script src="https://unpkg.com/react@16/umd/react.development.js" crossOrigin="true"></script>*/}
                    {/*<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossOrigin="true"></script>*/}

                    {/*<script type="text/javascript" src="./js/plugins/swiper.min.js"/>*/}
                    {/*<script type="text/javascript" src="./js/plugins/jquery-3.4.1.min.js"/>*/}
                    {/*<script type="text/javascript" src="./js/plugins/lazyload.min.js"/>*/}
                    {/*<script type="text/javascript" src="./js/plugins/jquery.fancybox.min.js"/>*/}
                    {/*<script type="text/javascript" src="./js/plugins/jquery.inputmask.min.js"/>*/}
                    {/*<script type="text/javascript" src="./js/main.js"/>*/}
                    {/*-------------------------------------*/
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}

// export default App;
