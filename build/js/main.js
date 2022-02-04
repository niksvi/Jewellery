const burger = document.querySelector('.menu__burger');
const nav = document.querySelector('.nav');
const pageHeader = document.querySelector('.page-header');
const header = document.querySelector('.menu__upper-row');
const page = document.querySelector('.page');

header.classList.remove('no-js');
pageHeader.classList.remove('no-js');
nav.classList.remove('no-js');

if (burger && nav) {
  burger.addEventListener('click', function () {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    pageHeader.classList.toggle('active');
    page.classList.toggle('menu-open');
  });
}
