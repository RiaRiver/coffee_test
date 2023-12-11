// eslint-disable-next-line import/extensions
import handleScroll from './_scroll.js';

const initBurgerMenu = () => {
  const burgerBtn = document.querySelector('.header__burger-btn');
  const menu = document.querySelector('.header__nav');
  const activeAttr = 'data-active';

  const toggleMenu = () => {
    menu.toggleAttribute(activeAttr);
    burgerBtn.toggleAttribute(activeAttr);
    handleScroll('toggle');
  };

  const closeMenu = () => {
    menu.removeAttribute(activeAttr);
    burgerBtn.removeAttribute(activeAttr);
    handleScroll('on');
  };

  const handleMenu = (event) => {
    if (event.target.tagName === 'A') {
      closeMenu();
    }
  };

  burgerBtn.addEventListener('click', toggleMenu);
  menu.addEventListener('click', handleMenu);

  const closeMedia = window.matchMedia('(max-width: 768px)');

  closeMedia.addEventListener('change', closeMenu);
};

export default initBurgerMenu;
