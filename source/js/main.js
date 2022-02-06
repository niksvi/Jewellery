import './vendors.js';

const burger = document.querySelector('.menu__burger');
const nav = document.querySelector('.nav');
const pageHeader = document.querySelector('.page-header');
const header = document.querySelector('.menu__upper-row');
const page = document.querySelector('.page');
const main = page.querySelector('main');

const tumbler = document.querySelectorAll('.tumbler');

const sliderElement = document.querySelector('.swiper');

// mobMenu

header.classList.remove('no-js');
pageHeader.classList.remove('no-js');
nav.classList.remove('no-js');

if (burger && nav) {
  burger.addEventListener('click', function () {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    pageHeader.classList.toggle('active');
    page.classList.toggle('menu-open');
    main.classList.toggle('visually-hidden');
  });
}

// Tumbler

tumbler.forEach((element) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    let parent = element.parentNode;
    if (parent.classList.contains('active')) {
      parent.classList.remove('active');
    } else {
      document.querySelectorAll('.questions__question').forEach((child) => {
        child.classList.remove('active');
        parent.classList.add('active');
      });
    }
  });
});

// swiper

let swiperSlider = {};
let sliderType;
if (window.innerWidth < 768) {
  sliderType = 'mobile';
} else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
  sliderType = 'tablet';
} else {
  sliderType = 'desktop';
}

function initSlider(type) {
  let sliderSettings = {};
  if (type === 'mobile') {
    sliderSettings = {
      direction: 'horizontal',
      loop: true,
      updateOnWindowResize: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        }
      },
    };
  } else if (type === 'tablet') {
    sliderSettings = {
      direction: 'horizontal',
      loop: true,
      updateOnWindowResize: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      },
    };
  } else {
    sliderSettings = {
      direction: 'horizontal',
      loop: true,
      updateOnWindowResize: true,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      },
    };
  }

  if (swiperSlider.destroy && typeof swiperSlider.destroy === 'function') {
    swiperSlider.destroy();
  }
  swiperSlider = new Swiper(sliderElement, sliderSettings);
}

initSlider(sliderType);

window.addEventListener('resize', () => {
  if (window.innerWidth < 768 && sliderType !== 'mobile') {
    sliderType = 'mobile';
    initSlider(sliderType);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && sliderType !== 'tablet') {
    sliderType = 'tablet';
    initSlider(sliderType);
  } else if (window.innerWidth >= 1024 && sliderType !== 'desktop') {
    sliderType = 'desktop';
    initSlider(sliderType);
  }
});
