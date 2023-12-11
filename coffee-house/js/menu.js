/* eslint-disable import/extensions */
import initBurgerMenu from './_burgerMenu.js';
import initProducts from './_menuProducts.js';
import getProducts from './_products.js';

initBurgerMenu();

await getProducts();

initProducts();
