import React, {Component} from "react";

import '../../css/landing/plugins/jquery.fancybox.min.css'
import '../../css/landing/plugins/hamburgers.min.css'
import '../../css/landing/normalize.css'
import '../../css/landing/main.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import {
    GOOGLE_ANALYTIC_ACC,
    HOST,
    host_adv,
    HOST_BASE,
    host_clientResponse,
    host_images, PROTOCOL, WEB_URL,
    YA_METRICS_ACC
} from "../consts";
import {YMInitializer} from "react-yandex-metrika";
import ReactGA from "react-ga";

const styles = theme => ({

    closeButton: {
        position: 'absolute',
        right: 0,
        // top: theme.spacing(1),
        // color: theme.palette.grey[500],
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class LandingPage extends Component {

    state = {
        isOpenModalCatalog: false,
        isOpenModalBecomePartner: false,
        snackOpen: false,
        partnerNameValue: '',
        partnerNameError: '',
        partnerPhoneValue: '+7',
        partnerPhoneError: '',
        partnerInfoValue: '',
        partnerInfoError: '',

        randData: []
    }

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search);
        let reqAddr = host_adv + '/getRandomIds/';
        axios.get(reqAddr).then(res => {
            const arr = res.data
            arr.forEach(function (item, index) {
                console.log(item, index);
            });
            this.setState({randData: arr})
            // this.setState({url: urlForState});
        })
    }

    handleClickOpenCatalog = () => {
        console.log("OPEN ME")
        this.setState({isOpenModalCatalog: true})
        console.log(this.state.isOpenModalCatalog)
    };

    handleCancelOpenCatalog = () => {
        console.log("CANCEL ME")
        this.setState({isOpenModalCatalog: false})
    };

    handleClickOpenBecomePartner = () => {
        console.log("OPEN ME")
        this.setState({isOpenModalBecomePartner: true})
        console.log(this.state.isOpenModalBecomePartner)
    };

    handleCancelOpenBecomePartner = () => {
        console.log("CANCEL ME")
        this.setState({isOpenModalBecomePartner: false})
    };


    render() {
        ReactGA.initialize(GOOGLE_ANALYTIC_ACC, {
            debug: true
        });
        // ReactGA.pageview(window.location.pathname + window.location.search);
        const {classes} = this.props;
        return (
            (<body className="body">
                <header>
                    <div className="top-header">
                        <div className="section">
                            <div className="top-header__info">
                                <p className="top-header__info-text">Делись ссылками linkme.club и зарабатывай</p>
                                <a className="top-header__info-button" onClick={this.handleClickOpenCatalog}>Смотреть
                                    объявления</a>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="bottom-header">
                            <div className="bottom-header__wrap">
                                <a href="/" className="bottom-header__logo">
                                    <div className="bottom-header__img-wrap">
                                        <img src={require("../../img/landing/logo.png")} alt="Логотип"
                                             className="bottom-header__img"/>
                                    </div>

                                    <p className="bottom-header__logo-text">cообщество благодарных предпринимателей</p>
                                </a>

                                <ul className="bottom-header__list">

                                    {/*<li className="bottom-header__item">*/}
                                    {/*    <a href="#" className="bottom-header__item-link">О проекте</a>*/}
                                    {/*</li>*/}


                                    {/*<li className="bottom-header__item">*/}
                                    {/*    <a href="#" className="bottom-header__item-link">Все объявления</a>*/}
                                    {/*</li>*/}


                                    {/*<li className="bottom-header__item">*/}
                                    {/*    <a href="#" className="bottom-header__item-link">Помощь</a>*/}
                                    {/*</li>*/}


                                    {/*<li className="bottom-header__item">*/}
                                    {/*    <a href="#" className="bottom-header__item-link">Контакты</a>*/}
                                    {/*</li>*/}


                                    <li className="bottom-header__item bottom-header__last-item">
                                        <a href="#" className="bottom-header__item-link link-main">Заработай на
                                            продажах</a>
                                    </li>

                                </ul>
                            </div>

                            <button className="hamburger hamburger--collapse" type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                            </button>
                        </div>
                    </div>

                    <nav className="mobile-nav">
                        <ul className="bottom-header__list">

                            {/*<li className="bottom-header__item">*/}
                            {/*    <a href="#" className="bottom-header__item-link">О проекте</a>*/}
                            {/*</li>*/}


                            {/*<li className="bottom-header__item">*/}
                            {/*    <a href="#" className="bottom-header__item-link">Все объявления</a>*/}
                            {/*</li>*/}


                            {/*<li className="bottom-header__item">*/}
                            {/*    <a href="#" className="bottom-header__item-link">Помощь</a>*/}
                            {/*</li>*/}


                            {/*<li className="bottom-header__item">*/}
                            {/*    <a href="#" className="bottom-header__item-link">Контакты</a>*/}
                            {/*</li>*/}


                            <li className="bottom-header__item bottom-header__last-item">
                                <a href="#" className="bottom-header__item-link link-main">Заработай на продажах</a>
                            </li>

                        </ul>
                    </nav>
                </header>

                <main>
                    <section className="section earn">
                        <h1 className="earn__title">Зарабатывай!<br/>
                            Получай вознаграждение<br/>
                            за продажи по твоим ссылкам
                            linkme.club
                        </h1>
                        <p className="earn__desc">используй социальные сети и мессенджеры, чтобы поделиться ссылкой</p>

                        <a href="#" className="link-main earn__link" onClick={this.handleClickOpenCatalog}>Смотреть
                            объявления</a>

                        <div className="earn__bg-img">
                            <img src={require("../../img/landing/first-screen.png")} alt="Фон"/>
                        </div>

                    </section>

                    <section className="how-iw section">
                        <h3 className="section__title">Как это работает</h3>

                        <div className="how-iw__items">

                            <div className="how-iw__item">
                                <div className="how-iw__img-wrap">
                                    <img src={require("../../img/landing/second-icon-1.png")} alt="Иконка бонуса"
                                         className="how-iw__img"/>
                                </div>

                                <h6 className="how-iw__name">Бонус - это главное!</h6>

                                <p className="how-iw__desc"><b>Главное правило</b> linkme.club - продавец
                                    платит бонус <b>(вознаграждение)</b> за помощь
                                    в продаже.
                                </p>

                                <div className="how-iw__bonus-wrap">

                                    <p className="how-iw__bonus-text how-iw__desc">
                                        <b>Принцип выплаты бонуса</b> <br/>
                                        (вознаграждения, комиссии) за помощь
                                        в продаже используется предпринимателями
                                        и бизнесменами с незапамятных времен.
                                    </p>
                                    <p className="how-iw__bonus-text how-iw__desc">Благодарность в виде денежной
                                        выплаты
                                        за помошь в организации сделки или
                                        знакомсва продавца с покупателем -
                                        присутствует в любом виде бизнеса.
                                    </p>
                                    <p className="how-iw__bonus-text how-iw__desc">Linkme.club - сервис, который
                                        перенес в
                                        онлайн принцип выплаты бонуса за
                                        помощь в продаже
                                    </p>

                                </div>
                            </div>

                            <div className="how-iw__item">
                                <div className="how-iw__img-wrap">
                                    <img src={require("../../img/landing/second-icon-2.png")} alt="Иконка простоты"
                                         className="how-iw__img"/>
                                </div>

                                <h6 className="how-iw__name">Просто и понятно</h6>

                                <p className="how-iw__desc"><b>Для каждого</b> объявления linkme.club у
                                    пользователя есть <b>собственная</b> уникальная
                                    <b>ссылка</b>.
                                </p>
                                <p className="how-iw__desc">Ссылкой можно поделиться в соцсети,
                                    мессенджере или скопировать и отправить,
                                    например друзьям и знакомым
                                </p>
                                <p className="how-iw__desc">Каждый посетитель объявления фиксируется
                                    системой и закрепляется за тем пользователем,
                                    по чьей ссылке пришел посетитель
                                </p>
                            </div>

                            <div className="how-iw__item">
                                <div className="how-iw__img-wrap">
                                    <img src={require("../../img/landing/second-icon-3.png")} alt="Иконка безопасности"
                                         className="how-iw__img"/>
                                </div>

                                <h6 className="how-iw__name">Без обмана</h6>

                                <p className="how-iw__desc">На linkme.club нет случайных объявлений
                                    Каждый Продавец - партнер сервиса.
                                </p>

                                <p className="how-iw__desc">Как только проходит продажа - мы тут же
                                    связываемся с пользователем (с его аккаунтом в
                                    социальной сети) и переводим вознаграждение
                                </p>
                            </div>

                        </div>
                    </section>

                    <section className="banner">
                        <div className="section">
                            <p className="banner__text">Уже сегодня на Linkme.club продвигаются товары
                                с общим размером вознаграждения
                            </p>

                            <p className="banner__price">3 000 000 руб.</p>
                        </div>
                    </section>

                    <section className="member">
                        <div className="section">
                            <h4 className="section__title">Стань участником</h4>

                            <p className="member__link">В любом объявлении linkme.club:</p>

                            <div className="member__wrap">
                                <div className="member__item">
                                    <p className="member__numb">1</p>
                                    <p className="member__desc">Войди и получи свою ссылку</p>
                                </div>

                                <div className="member__img-wrap">
                                    <img src={require("../../img/landing/arrow-right-header-hover.png")}
                                         alt="Стрелка"
                                         className="member__img"/>
                                </div>

                                <div className="member__item">
                                    <p className="member__numb">2</p>
                                    <p className="member__desc">Отправь ссылку в сообщество или друзьям</p>
                                </div>

                                <div className="member__img-wrap">
                                    <img src={require("../../img/landing/arrow-right-header-hover.png")}
                                         alt="Стрелка"
                                         className="member__img"/>
                                </div>

                                <div className="member__item">
                                    <p className="member__numb">3</p>
                                    <p className="member__desc">Получи деньги за продажу по твоей ссылке</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/*<section className="section">*/}
                    {/*    <div className="like">*/}
                    {/*        <div className="like__wrap">*/}
                    {/*            <h4 className="section__title">Почему linkme.club любят</h4>*/}

                    {/*            <img src={require("../../img/landing/like-bg.png")} alt="Почему нас любят"*/}
                    {/*                 className="like__img"/>*/}

                    {/*            <p className="like__desc">Продавцы - это отиличный способ продавать с эффектом*/}
                    {/*                сарафанного радио*/}
                    {/*                и налетом дружелюбности.*/}
                    {/*            </p>*/}
                    {/*            <p className="like__desc">Продавцы - это отиличный способ продавать с эффектом*/}
                    {/*                сарафанного радио*/}
                    {/*                и налетом дружелюбности.*/}
                    {/*            </p>*/}
                    {/*            <p className="like__desc">Продавцы - это отиличный способ продавать с эффектом*/}
                    {/*                сарафанного радио*/}
                    {/*                и налетом дружелюбности.*/}
                    {/*            </p>*/}

                    {/*            <a href="#feedback" data-fancybox="feedback" className="like__button link-main">Связаться*/}
                    {/*                с нами</a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    <section className="section announce">
                        <h4 className="section__title">Выбери объявления и заработай</h4>
                        {randomAdv(this.state.randData)}

                        <a className="announce__button-more link-main" onClick={this.handleClickOpenCatalog}>Смотреть
                            больше объявлений</a>

                    </section>

                    <section className="partners section">
                        <h4 className="section__title">Партнеры</h4>

                        <div className="partners__items">
                            <div className="partners__item">
                                <div className="partners__img-wrap">
                                    <img src={require("../../img/landing/partner-item.png")} alt="Партнер"
                                         className="partners__img"/>
                                </div>
                            </div>
                            {/*<div className="partners__item">*/}
                            {/*    <div className="partners__img-wrap">*/}
                            {/*        <img src={require("../../img/landing/partner-item.png")} alt="Партнер"*/}
                            {/*             className="partners__img"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="partners__item">*/}
                            {/*    <div className="partners__img-wrap">*/}
                            {/*        <img src={require("../../img/landing/partner-item.png")} alt="Партнер"*/}
                            {/*             className="partners__img"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <a href="#be-partner" data-fancybox="be-partner" className="partners__button link-main"
                           onClick={this.handleClickOpenBecomePartner}>Стать партнером</a>
                    </section>


                    <div className="be-partner" id="be-partner">
                        <div className="be-partner__wrap">
                            <h3 className="be-partner__title">Станьте нашим партнером</h3>

                            <p className="be-partner__desc">Введите свои данные и мы перезвоним Вам
                                в ближайшее время на указанный номер
                            </p>

                            <form className="be-partner__form">

                                <div className="be-partner__item-wrap">

                                    <label htmlFor="modal-name" className="be-partner__label">Ваше имя</label>
                                    <div className="be-partner__rielt-wrap">
                                        <input className="be-partner__input" placeholder="Андрей" type="text"
                                               name="modal-name"
                                               id="modal-name"/>
                                    </div>

                                </div>

                                <div className="be-partner__item-wrap be-partner__item-numb">
                                    <label htmlFor="modal-tel" className="be-partner__label">Ваш телефон</label>

                                    <div className="be-partner__numb-wrap">
                                        <input className="be-partner__input be-partner__input-js"
                                               placeholder="+7 (___) ___-__-__"
                                               type="tel" name="modal-tel" id="modal-tel" inputMode="text"/>
                                    </div>
                                </div>

                                <div className="be-partner__item-wrap be-partner__item-wrap-btn">
                                    <button type="submit" className="be-partner__btn">Отправить свои данные</button>

                                    <p className="be-partner__btn-desc">Нажимая на кнопку отправить Вы даете
                                        согласие на обработку
                                        персональных
                                        данных</p>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="feedback" id="feedback">
                        <div className="feedback__wrap">
                            <h3 className="feedback__title">Свяжитесь с нами</h3>

                            <p className="feedback__desc">Введите свои данные и мы свяжемся
                                с Вами в ближайшее время </p>

                            <form className="feedback__form">

                                <div className="feedback__item-wrap">

                                    <label htmlFor="feedback-name" className="feedback__label">Ваше имя</label>
                                    <div className="feedback__rielt-wrap">
                                        <input className="feedback__input" placeholder="Андрей" type="text"
                                               name="feedback-name"
                                               id="feedback-name"/>
                                    </div>
                                </div>

                                <div className="feedback__item-wrap feedback__item-numb">
                                    <label htmlFor="feedback-tel" className="feedback__label">Ваш телефон</label>

                                    <div className="feedback__numb-wrap">
                                        <input className="feedback__input feedback__input-js"
                                               placeholder="+7 (___) ___-__-__"
                                               type="tel" name="feedback-tel" id="feedback-tel" inputMode="text"/>
                                    </div>
                                </div>

                                <div className="feedback__item-wrap feedback__item-numb">
                                    <label htmlFor="feedback-message" className="feedback__label">Ваш вопрос</label>

                                    <div className="feedback__numb-wrap">
                                            <textarea className="feedback__message" placeholder="Сообщение"
                                                      name="feedback-message"
                                                      id="feedback-message" cols="30" rows="5"></textarea>
                                    </div>
                                </div>

                                <div className="feedback__item-wrap feedback__item-wrap-btn">
                                    <button type="submit" className="feedback__btn">Отправить свои данные</button>

                                    <p className="feedback__btn-desc">Нажимая на кнопку отправить Вы даете согласие
                                        на обработку
                                        персональных
                                        данных</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>

                <footer className="footer">
                    <div className="section">
                        <div className="footer__wrap">

                            <div className="footer__two-colums">

                                <div className="footer__colum">
                                    <a href="" className="footer__logo">
                                        <div className="footer__img-wrap"><img
                                            src={require("../../img/landing/logo.png")}
                                            alt="Логотип сайта"
                                            className="footer__img"/>
                                        </div>
                                        <p className="footer__service">Сообщество благодарных предпринимателей</p>
                                    </a>

                                    <p className="footer__paragraph footer__copyright">
                                        LinkMe.club © Copyright 2020
                                    </p>
                                </div>

                                <div className="footer__colum">

                                    <ul className="footer__list">
                                        {/*<li className="footer__item-list"><a href="" className="footer__item-link">О*/}
                                        {/*    проекте</a></li>*/}
                                        {/*<li className="footer__item-list"><a href="" className="footer__item-link">Все*/}
                                        {/*    объявления</a></li>*/}
                                        {/*<li className="footer__item-list"><a href=""*/}
                                        {/*                                     className="footer__item-link">Помощь</a>*/}
                                        {/*</li>*/}
                                        {/*<li className="footer__item-list"><a href=""*/}
                                        {/*                                     className="footer__item-link">Контакты</a>*/}
                                        {/*</li>*/}
                                    </ul>
                                </div>
                            </div>

                            <div className="footer__two-colums">
                                <div className="footer__colum footer__political">
                                    <div className="footer__socials">
                                        {/*<a href="#" className="footer__social">*/}
                                        {/*    <img src={require("../../img/landing/social-telegram.png")}*/}
                                        {/*         alt="Иконка телеграмма"*/}
                                        {/*         className="footer__social-img"/>*/}
                                        {/*</a>*/}
                                        <a href="https://vk.com/linkme.club" className="footer__social">
                                            <img src={require("../../img/vk-color.png")}
                                                 alt="Иконка vk"
                                                 className="footer__social-img"/>
                                        </a>
                                        <a href="https://www.facebook.com/groups/2637764899771970"
                                           className="footer__social">
                                            <img src={require("../../img/landing/social-facebook.png")}
                                                 alt="Иконка fb"
                                                 className="footer__social-img"/>
                                        </a>
                                    </div>

                                    {/*<a href="#" className="footer__political">Политика конфиденциальности</a>*/}

                                </div>

                                {/*<div className="footer__colum footer__last">*/}
                                {/*    <a href="#" className="footer__quest">Задать вопрос</a>*/}

                                {/*    <a className="footer__link-mail"*/}
                                {/*       href="mailto:info@site-project.ru">linkme@gmail.com</a>*/}

                                {/*    <a href="#" className="footer__circs">Условия использования</a>*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog open={this.state.isOpenModalCatalog} onClose={this.handleCancelOpenCatalog}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Список всех объявлений

                            </DialogTitle>
                            <IconButton aria-label="close" className={classes.closeButton}
                                        onClick={this.handleCancelOpenCatalog}>
                                <CloseIcon/>
                            </IconButton>
                            <DialogContent>
                                <DialogContentText>
                                    <a>"Смотри полный каталог всех предложений в наших сообществах <br/>в </a>
                                    <a href={"https://vk.com/linkme.club"}><u>ВК</u></a>
                                    <a> и </a>
                                    <a href={"https://www.facebook.com/groups/2637764899771970"}><u>ФБ</u></a>
                                </DialogContentText>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancelOpenCatalog} color="primary">
                                    OK
                                </Button>
                                {/*<Button onClick={this.handleSend} color="blue" variant="outlined"*/}
                                {/*        className={classes.root}>*/}
                                {/*    Отправить*/}
                                {/*</Button>*/}
                            </DialogActions>
                        </Dialog>
                        <Snackbar open={this.state.snackOpen}
                                  autoHideDuration={3500}
                                  onClose={this._handleSnackClose}
                                  anchorOrigin={{
                                      "horizontal": "center",
                                      "vertical": "top",
                                  }}
                        >

                        </Snackbar>
                    </div>

                    <div>
                        <Dialog open={this.state.isOpenModalBecomePartner} onClose={this.handleCancelOpenBecomePartner}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Стать Партнером

                            </DialogTitle>
                            <IconButton aria-label="close" className={classes.closeButton}
                                        onClick={this.handleCancelOpenBecomePartner}>
                                <CloseIcon/>
                            </IconButton>
                            <DialogContent>
                                <TextField
                                    className={classes.partnerName}
                                    autoFocus
                                    margin="dense"
                                    id="partnerName"
                                    label="Как Вас зовут?"
                                    type="text"
                                    fullWidth
                                    required
                                    error={this.state.partnerNameError}
                                    value={this.state.partnerNameValue}
                                    onChange={this._handlePartnerNameChange}
                                />
                                <InputMask mask="+9 999 999 99 99"
                                           maskChar=" "
                                           value={this.state.partnerPhoneValue}
                                           onChange={this._handlePartnerPhoneChange}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="partnerPhone"
                                        label="Номер для связи"
                                        type="text"
                                        fullWidth
                                        required
                                        error={this.state.partnerPhoneError}
                                    >
                                    </TextField>
                                </InputMask>
                                <TextField
                                    className={classes.partnerInfo}
                                    autoFocus
                                    margin="dense"
                                    id="partnerInfo"
                                    label="Дополнительно"
                                    type="text"
                                    fullWidth
                                    required
                                    error={this.state.partnerInfoError}
                                    value={this.state.partnerInfoValue}
                                    onChange={this._handlePartnerInfoChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                {/*<Button onClick={this.handleCancel} color="primary">*/}
                                {/*    Отмена*/}
                                {/*</Button>*/}
                                {/*todo добавить обработку на бэк с отравкой email о новом партнере*/}
                                <Button onClick={this.handleSend} color="blue" variant="outlined"
                                        className={classes.root}>
                                    Отправить
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar open={this.state.snackOpen}
                                  autoHideDuration={3500}
                                  onClose={this._handleSnackClose}
                                  anchorOrigin={{
                                      "horizontal": "center",
                                      "vertical": "top",
                                  }}
                        >
                            <Alert onClose={this._handleSnackClose} severity="success">
                                Спасибо! Заявка отправлена.
                            </Alert>
                        </Snackbar>
                        <YMInitializer accounts={[YA_METRICS_ACC]}/>
                    </div>
                </footer>

                <script type="text/javascript" src="js/plugins/jquery-3.4.1.min.js"></script>
                <script type="text/javascript" src="js/plugins/lazyload.min.js"></script>
                <script type="text/javascript" src="js/plugins/jquery.fancybox.min.js"></script>
                {/*<script type="text/javascript" src="js/plugins/jquery.inputmask.min.js"></script>*/}
                {/*<script type="text/javascript" src="js/main.js"></script>*/}
                </body>
            )
        )
    }


    _handlePartnerNameChange = (e) => {
        this.setState({
            partnerNameValue: e.target.value
        });
    }


    _handlePartnerInfoChange = (e) => {
        this.setState({
            partnerInfoValue: e.target.value
        });
    }

    _handlePartnerPhoneChange = (e) => {
        this.setState({
            partnerPhoneValue: e.target.value
        });
    }

    handleSend = () => {
        console.log("SEND ME")
        console.log("ClientName Value:")
        console.log(this.state.partnerNameValue)
        console.log(this.state.partnerPhoneValue)

        if (this.state.partnerNameValue && this.state.partnerPhoneValue) {
            let phone = this.state.partnerPhoneValue
                .replace('+', '')
                .replace('(', '')
                .replace(')', '')
                .split(' ').join('')
                .split('_').join('')

            if (phone.length === 11) {
                console.log("MATCH")
                this.setState({partnerPhoneError: ''})
                this.setState({partnerNameError: ''})

                //отправить данные на сервер:
                //todo переделать с localStorage!!!
                axios.post(HOST + '/newPartner',
                    {
                        name: this.state.partnerNameValue,
                        phone: this.state.clientPhoneValue,
                    })
                this.setState({isOpenModalBecomePartner: false})
                this.setState({snackOpen: true});
            } else {
                this.setState({partnerPhoneError: 'Введите полный номер телефона'})
            }
            //провалидировать номер телефона
        } else {
            if (!this.state.partnerNameValue) {
                this.setState({partnerNameError: 'Введите имя'})
            }
            if (!this.state.partnerPhoneValue) {
                this.setState({partnerPhoneError: 'Введите номер телефона'})
            }
        }
    }

    _handleSnackClose = () => {
        this.setState({
            snackOpen: false
        });
    }


}

function randomAdv(randData) {
    console.log("randomAdv")
    // let reqAddr = host_adv + '/getRandomIds/';
    // axios.get(reqAddr).then(res => {
    //     const arr = res.data
    randData.forEach(function (item, index) {
        console.log(item, index);
    });
    let addr = host_images + `/downloadSliderPhoto?url=test-flat&type=slider1&index=1`
    //     this.setState({randData: arr})
    //     // this.setState({url: urlForState});
    // })
    if (randData) {
        return (
            <div>
                <div className="announce__items">
                    {/*Заполнять блок динамически добавить метод получения ссылки и даных на бэк*/}
                    {
                        randData.map((item, key) => {
                            return (
                                <div key={key} className="announce__item">
                                    <div className="announce__img-wrap">
                                        <p className="announce__img-desc">Поделись ссылкой и заработай на этом
                                            <span className="announce__img-price">{item.bonus}</span>
                                        </p>
                                        {/*<img src={addr}*/}
                                        {/*<img src={require("../../img/landing/announce-item.png")}*/}
                                        <img
                                            src={host_images + `/downloadSliderPhoto?url=${item.url}&type=slider1&index=0`}
                                            alt="Картинка объявления"
                                            className="announce__img"/>
                                    </div>
                                    <div className="announce__info">
                                        <p className="announce__name">{item.header}
                                        </p>
                                        <p className="announce__desc">{item.commentHeader}
                                        </p>
                                        <p className="announce__price">{item.price}</p>
                                        <p className="announce__price-desc">{item.commentPrice}</p>
                                        <a href={PROTOCOL + item.url + "." + WEB_URL}
                                           className="announce__button link-main">Перейти
                                            к
                                            объявлению</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/*<div className="announce__item">*/}
                    {/*    <div className="announce__img-wrap">*/}
                    {/*        <p className="announce__img-desc">Поделись ссылкой и заработай на этом*/}
                    {/*            <span className="announce__img-price">500 000 </span>*/}
                    {/*        </p>*/}
                    {/*        <img src={require("../../img/landing/announce-item.png")} alt="Картинка объявления"*/}
                    {/*             className="announce__img"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="announce__info">*/}
                    {/*        <p className="announce__name">Продажа квартиры*/}
                    {/*            в историческом районе*/}
                    {/*        </p>*/}
                    {/*        <p className="announce__desc">Концептуальный и эксклюзивный проект,*/}
                    {/*            свободный от условностей. Этот дом*/}
                    {/*            цепляет и внешним видом*/}
                    {/*        </p>*/}
                    {/*        <p className="announce__price">105 000 000 </p>*/}
                    {/*        <p className="announce__price-desc">Возможна покупка в ипотеку</p>*/}
                    {/*        <a href="#" className="announce__button link-main">Перейти к объявлению</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="announce__item">*/}
                    {/*    <div className="announce__img-wrap">*/}
                    {/*        <p className="announce__img-desc">Поделись ссылкой и заработай на этом*/}
                    {/*            <span className="announce__img-price">500 000 </span>*/}
                    {/*        </p>*/}

                    {/*        <img src={require("../../img/landing/announce-item.png")} alt="Картинка объявления"*/}
                    {/*             className="announce__img"/>*/}

                    {/*    </div>*/}

                    {/*    <div className="announce__info">*/}
                    {/*        <p className="announce__name">Продажа квартиры*/}
                    {/*            в историческом районе*/}
                    {/*        </p>*/}

                    {/*        <p className="announce__desc">Концептуальный и эксклюзивный проект,*/}
                    {/*            свободный от условностей. Этот дом*/}
                    {/*            цепляет и внешним видом*/}
                    {/*        </p>*/}

                    {/*        <p className="announce__price">105 000 000 </p>*/}

                    {/*        <p className="announce__price-desc">Возможна покупка в ипотеку</p>*/}

                    {/*        <a href="#" className="announce__button link-main">Перейти к объявлению</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            </div>);
    } else {
        return (
            <div>""</div>
        )
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);