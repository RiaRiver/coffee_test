import productsData from './products.json' assert { type: 'json' };

const productsByCategory = productsData.reduce((obj, product) => {
  const { category } = product;

  // eslint-disable-next-line no-prototype-builtins, no-param-reassign
  if (!obj.hasOwnProperty(category)) obj[category] = [];

  obj[category].push(product);

  return obj;
}, {});

export default productsByCategory;
