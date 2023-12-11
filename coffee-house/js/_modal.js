/* eslint-disable import/extensions */
import { createModalElement } from './_createElements.js';
import handleScroll from './_scroll.js';

const calcPrice = (event) => {
  const form = event.currentTarget;
  const { price: basicPrice } = form.dataset;

  const additionalPrice = Array.from(new FormData(form)
    .values())
    .reduce((sum, price) => sum + +price, 0);

  const priceELem = form.querySelector('[data-total]');

  priceELem.textContent = `$${(+basicPrice + additionalPrice).toFixed(2)}`;
};

const removeModal = (event) => {
  handleScroll('on');
  event.currentTarget.remove();
};

const closeModal = (event) => {
  if (event.target === event.currentTarget) {
    event.target.close();
  }
};

const handleModal = (event) => {
  const productCard = event.target.closest('.menu-product');

  if (productCard) {
    const { category, index } = productCard.dataset;
    const productsByCategory = globalThis.products_coffeeHouse;
    const product = productsByCategory[category][index];
    const modal = createModalElement(product, +index);

    document.body.append(modal);

    const closeBtn = modal.querySelector('[data-close]');
    const modalForm = modal.querySelector('form');

    modalForm.addEventListener('change', calcPrice);
    closeBtn.addEventListener('click', modal.close.bind(modal));

    modal.addEventListener('mousedown', closeModal);
    modal.addEventListener('close', removeModal);

    modal.showModal();
    modal.focus();
    modal.blur();

    handleScroll('off');
  }
};

export default handleModal;
