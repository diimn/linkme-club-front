import $ from 'jquery'
import Inputmask from 'inputmask'
import Swiper from 'swiper'
// import './plugins/jquery.fancybox.min.js'
// import fancybox from 'fancybox'

console.log("MAIN JS")

export function postRender() {
// document.addEventListener('load', function () {
    console.log("MAIN JS DOMContentLoaded")
    var mySwiperPhoto = new Swiper('.photo-obj-swiper', {
        loop: true,
        slidesPerView: 1,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    var mySwiperComplex = new Swiper('.about-comp-swiper', {
        loop: true,
        slidesPerView: 1,

        navigation: {
            nextEl: '.about-comp-next',
            prevEl: '.about-comp-prev',
        },
    });


    // $('[data-fancybox="modal-window"]').fancybox({
    //     touch: false,
    // });


    // $('[data-fancybox="modal-window"]').fancybox({
    //     touch: false,
    // });
    // });


    // $(document).ready(function () {
    //
    //     var modal = document.getElementById("modal-window");
    //     // (function(){
    //     let fancyB = document.querySelector('.flat-desc__btn-contact')
    //     if (fancyB != null) {
    //         fancyB.addEventListener('click', function () {
    //             console.log("!!!!!!!!!!!!!!! click связаться");
    //             modal.style.display = "block";
    //         });
    //     }
    //
    //
    //     // modal.
    //
    //     // $('[data-fancybox="modal-window"]').fancybox({
    //     //     touch: false,
    //     // });
    //
    //     // })($.noConflict());
    //
    //     // $('#modal-tel').inputmask({
    //     //     mask: '+7 (999) 999-99-99',
    //     // });
    //     // $('[data-fancybox="modal-window"]').fancybox({
    //     //     touch: false,
    //     // });
    // });

    // Inputmask({ mask: '+7 (999) 999-9999' }).mask('#modal-tel');

    if (document.querySelector('.header')) {
        let headerMain = document.querySelector('.header')
        let guestMain = document.querySelector('.main-header')
        let guestSecond = document.querySelector('.header-hover')
        let space = document.querySelector('.space__head')
        let man = document.querySelector('.header__man-wrap')
        let buttonLink = document.querySelector('.about-link__border')
        // let hamburgerUser = document.querySelector('.hamburger-user-js')
        // let hamburgerGuest = document.querySelector('.hamburger-guest-js')
        let socialList = document.querySelector('.header__social-list')
        let mainHeader = document.querySelector('.main-header')

        // setTimeout(() => {
        //     headerMain.style.opacity = '1';
        //     space.style.height = guestMain.scrollHeight + 'px';
        // }, 3000);

        let menuSlideDown = function () {
            guestMain.style.top = guestSecond.scrollHeight + 'px'
            guestSecond.style.top = 0 + 'px'
            if (document.querySelector('.header.user')) {
                if (window.innerWidth <= 992 && window.innerWidth > 576) {
                    man.style.top = '-62px'
                } else if (window.innerWidth <= 576) {
                    man.style.top = '-72px'
                }
                if (window.innerWidth <= 992) {
                    mainHeader.classList.add('active-user')
                    socialList.style.display = 'flex'
                    // hamburgerUser.style.top = `-${guestSecond.scrollHeight}px`
                    // hamburgerUser.classList.add('is-active')
                }
            }

            if (document.querySelector('.header.guest')) {
                if (window.innerWidth <= 576) {
                    mainHeader.classList.add('active-guest')
                    // hamburgerGuest.style.top = `-${guestSecond.scrollHeight}px`
                    // hamburgerGuest.classList.add('is-active')
                }
            }
        }

        let menuSlideUp = function () {
            guestMain.style.top = 0 + 'px'
            guestSecond.style.top = '-' + guestSecond.scrollHeight + 'px'
            if (document.querySelector('.header.user')) {
                if (window.innerWidth <= 992) {
                    man.style.top = '-' + guestSecond.scrollHeight + 'px'
                }
                if (window.innerWidth <= 992) {
                    socialList.style.display = 'none'
                    mainHeader.classList.remove('active-user')
                    // hamburgerUser.style.top = 0 + 'px'
                    // hamburgerUser.classList.remove('is-active')
                }
            }
            if (document.querySelector('.header.guest')) {
                if (window.innerWidth <= 576) {
                    mainHeader.classList.remove('active-guest')
                    // hamburgerGuest.style.top = 0 + 'px'
                    // hamburgerGuest.classList.remove('is-active')
                }
            }
        }

        headerMain.addEventListener('mouseenter', function () {
            menuSlideDown()
        })

        headerMain.addEventListener('mouseleave', function () {
            menuSlideUp()
        })

        buttonLink.addEventListener('click', function () {
            if (guestMain.style.top == 0 || guestMain.style.top == '0px') {
                menuSlideDown()
            } else {
                menuSlideUp()
            }
        })
        if (document.querySelector('.header.guest')) {
            // hamburgerGuest.addEventListener('click', function () {
            //     guestSecond.style.top == '0px' ? menuSlideUp() : menuSlideDown()
            // })
        }
        if (document.querySelector('.header.user')) {
            // hamburgerUser.addEventListener('click', function () {
            //     guestSecond.style.top == '0px' ? menuSlideUp() : menuSlideDown()
            // })

            var copysiteBtn = document.querySelector('.user-hover__copy')
            copysiteBtn.addEventListener('click', function (event) {
                var siteLink = document.querySelector('.header__site-link')
                var range = document.createRange()
                range.selectNode(siteLink)
                window.getSelection().addRange(range)

                try {
                    var successful = document.execCommand('copy')
                    var msg = successful ? 'successful' : 'unsuccessful'
                } catch (err) {
                }

                window.getSelection().removeAllRanges()
            })
        }
    }

    let activeNumbSell = function () {
        let rdyNumb = numbInp.value.replace(/[^\d]/g, '')
        let lenghtNumbs = rdyNumb.length

        let items = document.querySelectorAll('.modal-window__sell-item')

        if (lenghtNumbs > 1) {
            items[lenghtNumbs - 1].classList.remove('active')

            if (lenghtNumbs != 11) {
                items[lenghtNumbs].classList.add('active')
            }
        } else {
            items[1].classList.add('active')
        }

        console.log(rdyNumb)
    }

    let numbInp = document.querySelector('.modal-window__input-js')
    if (numbInp != null) {
        numbInp.oninput = activeNumbSell
    }
}

// document.addEventListener('DOMContentLoaded', postRender)
