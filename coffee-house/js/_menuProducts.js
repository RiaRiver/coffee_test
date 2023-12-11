/* eslint-disable import/extensions */
import { createProductCard } from './_createElements.js';
import handleModal from './_modal.js';
import productsByCategory from './_products.js';

const handleAddBtn = (action) => {
  const addBtn = document.querySelector('.menu__add-btn');

  if (action === 'view') {
    addBtn.removeAttribute('hidden');
  }

  if (action === 'hide') {
    addBtn.setAttribute('hidden', '');
  }
};

const renderProducts = (category = 'coffee') => {
  const productsList = document.querySelector('.menu__products');

  const products = productsByCategory[category]
    .map((product, index) => createProductCard(product, index));

  productsList.replaceChildren(...products);

  productsList.addEventListener('click', handleModal);

  if (products.length > 4) {
    handleAddBtn('view');
  } else {
    handleAddBtn('hide');
  }
};

const handleTabs = (event) => {
  const { target } = event;
  renderProducts(target.value);
};

const handleProducts = (action) => {
  const products = document.querySelectorAll('.menu-product');

  if (action === 'view') {
    products.forEach((product) => product.removeAttribute('hidden'));
    handleAddBtn('hide');
  }

  if (action === 'hide') {
    products.forEach((product, ind) => { if (ind > 3) product.setAttribute('hidden', ''); });
    handleAddBtn('view');
  }
};

const initProducts = () => {
  const tabsController = document.getElementById('tabs');
  const addBtn = document.querySelector('.menu__add-btn');
  const hideMedia = window.matchMedia('(max-width: 768px)');

  renderProducts();

  tabsController.addEventListener('change', handleTabs);
  addBtn.addEventListener('click', handleProducts.bind(null, 'view'));
  hideMedia.addEventListener('change', handleProducts.bind(null, 'hide'));
};

export default initProducts;
