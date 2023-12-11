// eslint-disable-next-line import/prefer-default-export
export const createProductCard = (product, index) => {
  const productElem = document.createElement('template');

  productElem.innerHTML = `<li class="product menu-product" ${index > 3 ? 'hidden' : ''}
                          data-category="${product.category}"
                          data-index="${index}">
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

export const createModalElement = (product, index) => {
  const modalElem = document.createElement('template');
  modalElem.innerHTML = `<dialog class="modal modal-product"
                        id="modal-product">
    <div class="modal__container modal-product__container">
      <picture class="product__image-wrapper modal-product__image-wrapper">
        <img src="../assets/img/menu/${product.category}-${index + 1}.jpg"
          alt=""
          class="product__image modal-product__image">
      </picture>
      <form class="modal-product__product" data-price="${product.price}">
        <div class="modal-product__heading">
          <h3 class="modal-product__title heading-3" autofocus>${product.name}</h3>
          <p class="modal-product__description regular-text">${product.description}</p>
        </div>
        <!-- /.modal-product__heading -->

        <fieldset class="modal-product__size">
          <h4 class="modal-product__fields-name regular-text">Size</h4>
          <ul class="list modal-product__buttons">
            <li class="menu__btn modal-product__size-item">
              <input id="size1"
                type="radio"
                class="size__btn"
                name="size"
                value="${product.sizes.s['add-price']}"
                checked
                hidden>
                <label class="link-button-text"
                  for="size1">
                  ${product.sizes.s.size}
                </label>
            </li>

            <li class="menu__btn modal-product__size-item">
              <input id="size2"
                type="radio"
                class="size__btn"
                name="size"
                value="${product.sizes.m['add-price']}"
                hidden>
                <label class="link-button-text"
                  for="size2">
                  ${product.sizes.m.size}
                </label>
            </li>

            <li class="menu__btn modal-product__size-item">
              <input id="size3"
                type="radio"
                class="size__btn"
                name="size"
                value="${product.sizes.l['add-price']}"
                hidden>
                <label class="link-button-text"
                  for="size3">
                  ${product.sizes.l.size}
                </label>
            </li>
          </ul>
        </fieldset>

        <fieldset class="modal-product__additives">
          <h4 class="modal-product__fields-name regular-text">Additives</h4>
          <ul class="list modal-product__buttons">
            <li class="menu__btn modal-product__additives-item">
              <input id="additives1"
                type="checkbox"
                class="additives__btn"
                name="${product.additives[0].name}"
                value="${product.additives[0]['add-price']}"
                hidden>
                <label class="link-button-text"
                  for="additives1">
                  ${product.additives[0].name}
                </label>
            </li>

            <li class="menu__btn modal-product__additives-item">
              <input id="additives2"
                type="checkbox"
                class="additives__btn"
                name="${product.additives[1].name}"
                value="${product.additives[1]['add-price']}"
                hidden>
                <label class="link-button-text"
                  for="additives2">
                  ${product.additives[1].name}
                </label>
            </li>

            <li class="menu__btn modal-product__additives-item">
              <input id="additives3"
                type="checkbox"
                class="additives__btn"
                name="${product.additives[2].name}"
                value="${product.additives[2]['add-price']}"
                hidden>
                <label class="link-button-text"
                  for="additives3">
                  ${product.additives[2].name}
                </label>
            </li>
          </ul>
        </fieldset>

        <div class="modal-product__price-wrapper heading-3">
          <span class="modal-product__price-text">Total:</span>
          <span class="modal-product__price-price" data-total>$${product.price}</span>
        </div>
        <!-- /.price-wrapper -->

        <p class="modal-product__alert caption-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee
          with up to 20%
          discount.
        </p>
        <button type="button"
          class="button link-btn link-btn--secondary link-button-text modal__button modal-product__button"
          data-close>
          Close
        </button>
      </form>
    </div>
    <!-- /.modal-product__container -->
  </dialog>`;

  return modalElem.content.firstElementChild;
};
