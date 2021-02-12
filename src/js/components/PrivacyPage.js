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
import {HOST, host_clientResponse} from "../consts";

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


class PrivacyPage extends Component {


    state = {
        // isOpenModalCatalog: false,
        isOpenModalDeleteUserData: false,
        userId: '',
        // partnerNameError: '',
        // partnerPhoneValue: '+7',
        // partnerPhoneError: '',
    }

    handleClickOpenModalDeleteUserData = () => {
        console.log("OPEN ME")
        this.setState({isOpenModalDeleteUserData: true})
        console.log(this.state.isOpenModalDeleteUserData)
    };

    handleCancelOpenModalDeleteUserData = () => {
        console.log("CANCEL ME")
        this.setState({isOpenModalDeleteUserData: false})
    };

    handleCancelOpenCatalog = () => {
        console.log("CANCEL ME")
        this.setState({isOpenModalDeleteUserData: false})
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
                                        <a onClick={this.handleClickOpenModalDeleteUserData}
                                           className="bottom-header__item-link link-main">Delete my data</a>
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


                            {/*<li className="bottom-header__item bottom-header__last-item">*/}
                            {/*    <a href="#" className="bottom-header__item-link link-main">Заработай на продажах</a>*/}
                            {/*</li>*/}

                        </ul>
                    </nav>
                </header>

                <main>


                    <section className="how-iw section">
                        <h3 className="section__title">Privacy policy</h3>

                        <div className="how-iw__items">

                            <div className="how-iw__item">

                                {/*<h6 className="how-iw__name">Бонус - это главное!</h6>*/}

                                <p className="how-iw__desc"><b> <br/> <br/> <br/> <br/></b>
                                </p>

                                <div className="how-iw__bonus-wrap">

                                    <p className="how-iw__bonus-text how-iw__desc">
                                        {/*<b>Принцип выплаты бонуса</b> <br/>*/}
                                        Privacy PolicyYour privacy is important to us. <br/>
                                        It is linkme.club's policy to respect your privacy <br/>
                                        regarding any information we may collect from you across our application
                                        http://linkme.club.<br/>
                                        We only ask for personal information when we truly need it to provide a service
                                        to you.<br/>
                                        We collect it by fair and lawful means, with your knowledge andconsent.<br/>
                                        We also let you know why we’re collecting it and how it will be used.<br/>
                                        We only retain collected information for as long as necessary to provide you
                                        with your requested service.<br/>
                                        What data we store, we’ll protect within commercially
                                        acceptable means to prevent loss and theft, as well as unauthorized access,
                                        disclosure, copying, use or modification. <br/>We don’t share any personally
                                        identifying information publicly or with third-parties, except when required to
                                        by law.<br/> Our website may link to external sites that are not operated by us.<br/>
                                        Please be aware that we have no control over the content and practices of these
                                        sites, and cannot accept responsibility or liability for their respective
                                        privacy policies.<br/> You are free to refuse our request for your personal
                                        information, with the understanding that we may be unable to provide you with
                                        some of your desired services. <br/>Your continued use of our application will
                                        be
                                        regarded as acceptance of our practices around privacy and personal information.<br/>
                                        If you have any questions about how we handle user data and personal
                                        information, feel free to contact us.<br/>This policy is effective as of 11
                                        January
                                        2021.
                                    </p>
                                    {/*<p className="how-iw__bonus-text how-iw__desc">Благодарность в виде денежной*/}
                                    {/*    выплаты*/}
                                    {/*    за помошь в организации сделки или*/}
                                    {/*    знакомсва продавца с покупателем -*/}
                                    {/*    присутствует в любом виде бизнеса.*/}
                                    {/*</p>*/}
                                    {/*<p className="how-iw__bonus-text how-iw__desc">Linkme.club - сервис, который*/}
                                    {/*    перенес в*/}
                                    {/*    онлайн принцип выплаты бонуса за*/}
                                    {/*    помощь в продаже*/}
                                    {/*</p>*/}

                                </div>
                            </div>

                        </div>
                    </section>


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
                                        <a href="https://vk.com/linkme.club" className="footer__social">
                                            <img src={require("../../img/vk-color.png")}
                                                 alt="Иконка vk"
                                                 className="footer__social-img"/>
                                        </a>
                                        <a href="https://www.facebook.com/groups/2637764899771970" className="footer__social">
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
                        <Dialog open={this.state.isOpenModalDeleteUserData}
                                onClose={this.handleCancelOpenModalDeleteUserData}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Delete My Data
                            </DialogTitle>
                            <IconButton aria-label="close" className={classes.closeButton}
                                        onClick={this.handleCancelOpenCatalog}>
                                <CloseIcon/>
                            </IconButton>
                            <TextField
                                // className={classes.partnerName}
                                autoFocus
                                margin="dense"
                                id="partnerName"
                                label="Your's social ID"
                                type="text"
                                fullWidth
                                required
                                error={this.state.partnerNameError}
                                value={this.state.partnerNameValue}
                                onChange={this._handlePartnerNameChange}
                            />
                            {/*<DialogContent>*/}
                            {/*    <DialogContentText>*/}
                            {/*        Каталог в разработке.*/}
                            {/*        <br/>*/}
                            {/*        Весь список объявлений смотрите в наших группах ВК и ФБ*/}
                            {/*    </DialogContentText>*/}

                            {/*</DialogContent>*/}
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
                                  autoHideDuration={3500} npm
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

PrivacyPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrivacyPage);