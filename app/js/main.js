
$(document).ready(function() {
  $('.menu').on("click", function() {
    $(this).toggleClass('active');
    $(".menu__body").toggleClass('active');
    
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

