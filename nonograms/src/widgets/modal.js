import { Button } from '../components';
import { Element } from '../utils';

export class Modal extends Element {
  /**
   * Constructor for creating a new instance of the class Modal.
   *
   * @param {string} titleText - The title text for Modal.
   * @return {Modal}
   */
  constructor(titleText) {
    super('dialog', '', { class: 'modal' });
    this.render(titleText);
  }

  /**
   * Render the modal with the provided title text and close button.
   *
   * @param {string} titleText - The text to be used as the title of the modal.
   */
  render(titleText) {
    const modalContainer = new Element('div', '', { class: 'modal__container' });
    const title = new Element('h3', titleText, { class: 'modal__title' });
    this.modalContent = new Element('div', '', { class: 'modal__content' });
    const closeBtn = new Button('Close', { class: 'modal__close' });

    this.setListeners([
      {
        event: 'click',
        handler: this.closeOnBackdrop,
      },
    ]);

    closeBtn.setListeners([
      {
        event: 'click',
        handler: this.close,
      },
    ]);

    modalContainer.mountComponents([title, this.modalContent, closeBtn]);
    this.mountComponents([modalContainer]);
  }

  /**
   * If updateContent is defined, it will be called before the modal is shown.
   *
   */
  show = () => {
    if (this.updateContent) { this.updateContent(); }
    this.element.showModal();
  };

  /**
   * Set the content of the modal by mounting the given components.
   *
   * @param {array} components - the components to be mounted
   */
  setContent(components) {
    this.modalContent.mountComponents(components, 'replaceChildren');
  }

  /**
   * Close the modal
   *
   */
  close = () => {
    this.element.close();
  };

  /**
   * A function that closes the element when the backdrop is clicked.
   *
   * @param {Event} event - the event object
   */
  closeOnBackdrop = (event) => {
    if (event.target === this.element) {
      this.close();
    }
  };
}
