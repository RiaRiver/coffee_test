export class Element {
  /**
   * Constructor for creating an Element instance.
   *
   * @param {string} tag - The tag of the element to create
   * @param {string} textContent - The text content to be added to the element
   * @param {object} props - The properties to be added to the element
   * @return {Element} An Element instance
   */
  constructor(tag, textContent, props) {
    this.create(tag, textContent, props);
  }

  /**
   * Creates an element with the given tag, text content, and properties.
   *
   * @param {string} tag - The tag of the element to create
   * @param {string} textContent - The text content to be added to the element
   * @param {object} props - The properties to be added to the element
   * @return {void}
   */
  create(tag, textContent, props) {
    const element = document.createElement(tag);
    Object.keys(props)
      .forEach((key) => {
        element.setAttribute(key, props[key]);
      });

    if (textContent) element.textContent = textContent;

    this.element = element;
  }

  /**
   * Retrieve the DOM element.
   *
   * @return {HTMLElement} The DOM element to be retrieved.
   */
  getElement() {
    return this.element;
  }

  /**
   * Set the content of the element.
   *
   * @param {string} content - The content to set
   * @return {void}
   */
  setContent(content) {
    this.element.textContent = content;
  }

  /**
   * Set listeners for the given events and their corresponding handlers.
   *
   * @param {Array} listeners - An array of objects containing event and handler properties.
   * @return {void}
   */
  setListeners(listeners) {
    listeners.forEach((listener) => {
      this.element.addEventListener(listener.event, listener.handler);
    });
  }

  /**
   * Mounts components to the element using the specified method.
   *
   * @param {Array} components - Array of components to mount
   * @param {string} [method='append'] - Method to use for mounting
   * @return {void}
   */
  mountComponents(components, method = 'append') {
    this.element[method](...components.map((component) => component.getElement()));
  }
}
