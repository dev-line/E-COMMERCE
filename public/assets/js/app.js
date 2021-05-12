import Swiper from "./swiper.min"
// Enable tooltips everywhere
$(function () {
  $('[data-toggle="popover"]').popover()
});

$('.popover-undismiss').popover({
trigger: 'focus'
});


$('.popover-dismiss').popover({
  trigger: 'focus'
});

// full Page
// new fullpage('#fullpage', {
      // navigation: true,
      // navigationPosition: 'left',
// });


// Categories Swiper

var productsCard = new Swiper('.productsCard', {
  simulateTouch:false,
  touchRatio: 0,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
});

var productThumbs = new Swiper('.productThumbs', {
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});


var sold = new Swiper('.sold', {
  slidesPerView: 4,
  spaceBetween: 50,
  simulateTouch:false,
  touchRatio: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

var SoldThdumbs = new Swiper('.SoldThdumbs', {
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
});




