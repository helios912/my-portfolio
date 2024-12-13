$(document).ready(function () {
    $('.menu').on('click', function () {
        $(this).toggleClass('active');
        $('.menu__body').toggleClass('active');
    });

    $('.tel').tipso({
        speed: 400,
        background: '#5DC145',
        titleBackground: '#5DC145',
        color: '#ffffff',
        titleColor: '#ffffff',
        titleContent: 'Зателефонувати',
        showArrow: true,
        position: 'top',
        width: 200,
        maxWidth: '',
        delay: 0,
        hideDelay: 0,
        animationIn: '',
        animationOut: '',
        offsetX: 0,
        offsetY: -30,
        tooltipHover: false,
        content: 'Phone me',
        ajaxContentUrl: null,
        contentElementId: null,
        useTitle: false,
        templateEngineFunc: null,
        onBeforeShow: null,
        onShow: null,
        onHide: null,
    });

    $('.mail').tipso({
        speed: 400,
        background: '#FC2C38',
        titleBackground: '#FC2C38',
        color: '#ffffff',
        titleColor: '#ffffff',
        titleContent: 'Написати листа',
        showArrow: true,
        position: 'top',
        width: 200,
        maxWidth: '',
        delay: 0,
        hideDelay: 0,
        animationIn: '',
        animationOut: '',
        offsetX: 0,
        offsetY: -30,
        tooltipHover: false,
        content: 'Mail me',
        ajaxContentUrl: null,
        contentElementId: null,
        useTitle: false,
        templateEngineFunc: null,
        onBeforeShow: null,
        onShow: null,
        onHide: null,
    });

    $('.mail').tipso({
        speed: 400,
        background: '#FC2C38',
        titleBackground: '#FC2C38',
        color: '#ffffff',
        titleColor: '#ffffff',
        titleContent: 'написати листа',
        showArrow: true,
        position: 'top',
        width: 200,
        maxWidth: '',
        delay: 200,
        hideDelay: 0,
        animationIn: '',
        animationOut: '',
        offsetX: 0,
        offsetY: -30,
        tooltipHover: false,
        content: null,
        ajaxContentUrl: null,
        contentElementId: null,
        useTitle: false,
        templateEngineFunc: null,
        onBeforeShow: null,
        onShow: null,
        onHide: null,
    });
});

document.querySelectorAll('.accordeon__triger').forEach((item) => {
    item.addEventListener('click', () => {
        item.parentNode.classList.toggle('accordeon__item--active');
    });
});

var container1 = document.querySelector('[data-ref="container-1"]');
var container2 = document.querySelector('[data-ref="container-2"]');

var config = {
    controls: {
        scope: 'local',
    },
};

var mixer1 = mixitup(container1, config);
var mixer2 = mixitup(container2, config);
