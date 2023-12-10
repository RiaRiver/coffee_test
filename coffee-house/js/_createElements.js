// eslint-disable-next-line import/prefer-default-export
export const createProductCard = (product, index) => {
  const productElem = document.createElement('template');

  productElem.innerHTML = `<li class="product menu-product" ${index > 3 ? 'hidden' : ''}>
      <picture class="product__image-wrapper menu-product__image-wrapper">
        <img src="../assets/img/menu/${product.category}-${index + 1}.jpg"
        alt=""
        class="product__image menu-product__image">
      </picture>

      <div class="product__text menu-product__text">
        <h3 class="product__title menu-product__title heading-3">${product.name}</h3>

        <p class="product__description menu-product__description regular-text">${product.description}</p>

        <span class="product__price menu-product__price heading-3">$${product.price}</span>

      </div>
      <!-- /.menu-product__text -->
    </li>
    <!-- /.menu-product -->`;

  return productElem.content;
};
