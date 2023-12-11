const getProducts = async () => {
  try {
    const response = await fetch('../js/products.json');
    const products = await response.json();

    const productsByCategory = products.reduce((obj, product) => {
      const { category } = product;

      // eslint-disable-next-line no-prototype-builtins, no-param-reassign
      if (!obj.hasOwnProperty(category)) obj[category] = [];

      obj[category].push(product);

      return obj;
    }, {});

    globalThis.products_coffeeHouse = productsByCategory;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка:', error);
  }
};

export default getProducts;
