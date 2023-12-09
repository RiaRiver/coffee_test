const initBurgerMenu = () => {
  const burgerBtn = document.querySelector('.header__burger-btn');
  const menu = document.querySelector('.header__nav');
  const activeAttr = 'data-active';
  const noScrollClass = 'no-scroll';

  const toggleMenu = () => {
    menu.toggleAttribute(activeAttr);
    burgerBtn.toggleAttribute(activeAttr);
    document.body.classList.toggle(noScrollClass);
  };

  const closeMenu = () => {
    menu.removeAttribute(activeAttr);
    burgerBtn.removeAttribute(activeAttr);
    document.body.classList.remove(noScrollClass);
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
