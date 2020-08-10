import React, {Component, useRef} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import InputMask from "react-input-mask";
import PropTypes from 'prop-types';

import {YMaps, Map, Placemark, withYMaps} from "react-yandex-maps";
import './css/plugins/swiper.css'
import './css/plugins/jquery.fancybox.min.css'
import './css/plugins/hamburgers.min.css'
import './css/normalize.css'
import './css/main.css'
import {styles1} from "./css/styles";

import axios from 'axios'


import {host_adv, host_clientResponse, host_images, host_repost, host_user, WEB_URL_API} from './js/consts'
import Header from "./js/components/Header";
import {postRender} from "./js/main";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        // top: theme.spacing(1),
        // color: theme.palette.grey[500],
    },
    clientName: {
        marginBottom: 25,
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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


class App extends Component {

    state = {
        isOpenModal: false,
        isLoading: true,
        content: [],
        url: "",
        userShortLink: "",
        numbersSlider: [],
        coordinates: [],
        mapData: [],
        clientNameValue: '',
        clientNameError: '',
        clientPhoneValue: '+7',
        clientPhoneError: '',
        isClientRealtor: false,
        snackOpen: false,
    }


    constructor(props) {
        super(props);

        this.photosRef = React.createRef()
        this.descRef = React.createRef()
        this.aboutRef = React.createRef()
        this.coordinatesRef = React.createRef()

        this.focusToPhotosElement = this.focusToPhotosElement.bind(this);
        this.focusToAboutElement = this.focusToAboutElement.bind(this);
        this.focusToDescElement = this.focusToDescElement.bind(this);
        this.focusToCoordinatesElement = this.focusToCoordinatesElement.bind(this);

    }


    focusToAboutElement() {
        window.scrollTo({
            top: this.aboutRef.current.offsetTop - 100,
            behavior: "smooth"
        })
    }

    focusToDescElement() {
        window.scrollTo({
            top: this.descRef.current.offsetTop - 100,
            behavior: "smooth"
        })
    }

    focusToPhotosElement() {
        window.scrollTo({
            top: this.photosRef.current.offsetTop - 100,
            behavior: "smooth"
        })
    }


    focusToCoordinatesElement() {
        window.scrollTo({
            top: this.coordinatesRef.current.offsetTop - 100,
            behavior: "smooth"
        })
    }

    handleClickOpen = () => {
        console.log("OPEN ME")
        this.setState({isOpenModal: true})
        console.log(this.state.isOpenModal)
    };

    handleCancel = () => {
        console.log("CANCEL ME")
        this.setState({isOpenModal: false})
    };

    handleSend = () => {
        console.log("SEND ME")
        console.log("ClientName Value:")
        console.log(this.state.clientNameValue)

        if (this.state.clientNameValue && this.state.clientPhoneValue) {
            let phone = this.state.clientPhoneValue
                .replace('+', '')
                .replace('(', '')
                .replace(')', '')
                .split(' ').join('')
                .split('_').join('')
            if (phone.length === 11) {
                console.log("MATCH")
                this.setState({clientNameError: ''})
                this.setState({clientPhoneError: ''})

                //отправить данные на сервер:
                //Имя, номер, является ли риэлтором, id объявления
                //todo переделать с localStorage!!!
                axios.post(host_clientResponse + '/post',
                    {
                        clientName: this.state.clientNameValue,
                        clientPhone: this.state.clientPhoneValue,
                        isRealtor: this.state.isClientRealtor,
                        advShortLink: localStorage.getItem('userLink'),
                        advSourceLink: this.state.url,
                    })
                this.setState({isClientRealtor: false});
                this.setState({isOpenModal: false})
                this.setState({snackOpen: true});
            } else {
                this.setState({clientPhoneError: 'Введите полный номер телефона'})
            }
            //провалидировать номер телефона
        } else {
            if (!this.state.clientNameValue) {
                this.setState({clientNameError: 'Введите имя'})
            }
            if (!this.state.clientPhoneValue) {
                this.setState({clientPhoneError: 'Введите номер телефона'})
            }
        }
    };

    _handleClientNameChange = (e) => {
        this.setState({
            clientNameValue: e.target.value
        });
    }

    _handleClientPhoneChange = (e) => {
        this.setState({
            clientPhoneValue: e.target.value
        });
    }

    _handleIsClientRealtorChange = (e) => {
        console.log("IS_REALTOR")
        console.log(e)
        this.setState({
            isClientRealtor: e.target.checked
        });
    }

    _handleSnackClose = () => {
        this.setState({
            snackOpen: false
        });
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
        const {classes} = this.props;
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
                    <div>
                        <Dialog open={this.state.isOpenModal} onClose={this.handleCancel}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Связаться с продавцом

                            </DialogTitle>
                            <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCancel}>
                                <CloseIcon/>
                            </IconButton>
                            <DialogContent>
                                <DialogContentText>
                                    Нравится предложение? Есть вопросы или нужны уточнения?
                                    <br/>
                                    Оставьте контакты, и Продавец сразу же перезвонит
                                </DialogContentText>
                                <TextField
                                    className={classes.clientName}
                                    autoFocus
                                    margin="dense"
                                    id="clientName"
                                    label="Как Вас зовут?"
                                    type="text"
                                    fullWidth
                                    required
                                    error={this.state.clientNameError}
                                    value={this.state.clientNameValue}
                                    onChange={this._handleClientNameChange}
                                />
                                <InputMask mask="+9 999 999 99 99"
                                           maskChar=" "
                                           value={this.state.clientPhoneValue}
                                           onChange={this._handleClientPhoneChange}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="clientPhone"
                                        label="Номер для связи"
                                        type="text"
                                        fullWidth
                                        required
                                        error={this.state.clientPhoneError}
                                    >
                                    </TextField>
                                </InputMask>
                                <FormControlLabel
                                    value="isRealtor"
                                    control={<Checkbox color="primary"/>}
                                    label="Я - риэлтор"
                                    labelPlacement="end"
                                    onChange={this._handleIsClientRealtorChange}
                                />
                                <DialogContentText>Для риэлторов предусмотрено отдельное вознаграждение.
                                    Отметьте этот пункт, если являетесь профессиональным участником
                                    рынка.</DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {/*<Button onClick={this.handleCancel} color="primary">*/}
                                {/*    Отмена*/}
                                {/*</Button>*/}
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
                                Спасибо! Заявка отправлена Продавцу.
                            </Alert>
                        </Snackbar>
                    </div>

                    <section className="section about-link">
                        <ul className="about-link__list">
                            <li className="about-link__item">
                                <a href="#" onClick={this.focusToPhotosElement} className="about-link__link">Фото
                                    объекта</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" onClick={this.focusToDescElement} className="about-link__link">Описание</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" onClick={this.focusToAboutElement} className="about-link__link">О
                                    комплексе</a>
                            </li>
                            <li className="about-link__item">
                                <a href="#" onClick={this.focusToCoordinatesElement}
                                   className="about-link__link">Местоположение</a>
                            </li>
                            <li className="about-link__item about-link__border">
                                <a className="about-link__link">Заработай на продаже объекта</a>
                            </li>
                        </ul>
                    </section>
                    <section className="photo-obj">
                        <h2 ref={this.photosRef} className="section__title">Фото</h2>
                        <div className="swiper-container photo-obj-swiper">
                            {sliderTop(this.state.numbersSlider.slider1Count,
                                this.state.url, this.state.content.slider1_comments)}
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
                        <div ref={this.descRef} className="section">
                            <div className="flat-desc__wrap-all">
                                <div className="flat-desc__img-human">
                                    <div className="flat-desc__img-wrap">
                                        {/*<img src={require('./img/human.jpg')} alt="Картинка продавца"*/}
                                        <img src={host_images + `/downloadBrokerPhoto?url=${this.state.url}`}
                                             alt="Картинка продавца"
                                             className="flat-desc__img"/>
                                    </div>
                                    <p className="flat-desc__about-human">
                                        {this.state.content.brokerName}
                                        <span className="flat-desc__desc-human">
                                            {this.state.content.brokerComment}
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
                                    <a href="#" onClick={this.handleClickOpen}
                                        // data-fancybox="modal-window"
                                       className="flat-desc__btn-contact">Связаться с продавцом</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section ref={this.aboutRef} className="about-comp">
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
                        <div ref={this.coordinatesRef} className="section__title">Расположение</div>
                        <YMaps style={styles1.YMaps}>
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
    if (text) {
        return (
            <div>
                {text.split('\\n').map((i, key) => {
                    return <span key={key}>{i} <br/></span>;
                })}
            </div>);
    } else {
        return (
            <div>""</div>
        )
    }
}


function bulletFormatter(text) {
    console.log("bulletFormatter")
    console.log(text)
    if (text) {
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
    } else {
        return (
            <div>""</div>
        )
    }
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

function sliderTop(count, url, slider1_comments) {
    const items = []
    console.log("SLIDER " + count)
    console.log("SLIDER 1" + slider1_comments)
    let commentsArray
    if (slider1_comments) {
        commentsArray = slider1_comments.split('|')
    }
    for (let i = 0; i < count; i++) {
        // console.log("SLIDER content " + i + ": " + commentsArray[i])
        let addr = host_images + `/downloadSliderPhoto?url=${url}&type=slider1&index=${i}`
        items.push(
            <div className="swiper-slide photo-obj__slide">
                <div className="photo-obj__img-wrap">
                    <img src={addr}
                         alt="Фото комплекса"
                         className="photo-obj__img"/>
                </div>
                {commentsArray && commentsArray[i] && commentsArray[i].trim() !== '' &&
                <div className="photo-obj__desc-wrap">
                    <div className="photo-obj__desc">
                        <div className="photo-obj__desc-text">
                            <p>{commentsArray[i]}</p>
                        </div>
                    </div>
                </div>
                }

            </div>
        )
    }
    return (
        <div className="swiper-wrapper">
            {items}
        </div>
    )
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);