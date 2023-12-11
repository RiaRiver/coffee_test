/* eslint-disable import/extensions */
import initBurgerMenu from './_burgerMenu.js';
import Slider from './_slider.js';
import initSwipe from './_swipe.js';

initBurgerMenu();

const slider = new Slider('.slider');
slider.init();

initSwipe();
