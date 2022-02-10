import './vendors.js';

const burger = document.querySelector('.menu__burger');
const nav = document.querySelector('.nav');
const pageHeader = document.querySelector('.page-header');
const header = document.querySelector('.menu__upper-row');
const page = document.querySelector('.page');
const main = document.querySelector('main');

const tumbler = document.querySelectorAll('.tumbler');
const tumblerFilter = document.querySelectorAll('.filter__tumbler');

const filterLink = document.querySelector('.catalog__wrapper > a');
const filter = document.querySelector('.catalog__filter');
const filterClose = document.querySelector('.filter > a');
const filterClear = document.querySelector('.button--clear');

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

if (tumbler) {
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
}

if (tumblerFilter) {
  tumblerFilter.forEach((element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      const parent = element.parentNode;
      parent.classList.toggle('active');
    });
  });
}

// filter

if (filterLink) {

  filterLink.addEventListener('click', function () {
    filter.classList.toggle('active');
    page.classList.toggle('menu-open');
  });

  const closeFilter = function () {
    if (filter.classList.contains('active')) {
      filter.classList.remove('active');
      page.classList.remove('menu-open');
    }
  };

  filterClose.addEventListener('click', closeFilter);

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeFilter();
    }
  });

  window.addEventListener('click', function (e) {
    const target = e.target;
    if (!target.closest('.filter') && !target.closest('.filter > a') && !target.closest('.catalog__wrapper > a')) {
      closeFilter();
    }
  });
}

if (filterClear) {
  filterClear.addEventListener('click', () => {
    document.querySelector('.filter').reset();
    document.getElementById('jew-1').checked = false;
    document.getElementById('jew-2').checked = false;
    document.getElementById('jew-4').checked = false;
  });
}

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
  // eslint-disable-next-line no-undef
  swiperSlider = new Swiper(sliderElement, sliderSettings);
}

if (sliderElement) {
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
}
