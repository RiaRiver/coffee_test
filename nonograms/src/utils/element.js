export class Element {
  constructor(tag, textContent, props) {
    this.create(tag, textContent, props);
  }

  create(tag, textContent, props) {
    const element = document.createElement(tag);
    Object.keys(props)
      .forEach((key) => {
        element.setAttribute(key, props[key]);
      });

    if (textContent) element.textContent = textContent;

    this.element = element;
  }

  getElement() {
    return this.element;
  }

  setContent(content) {
    this.element.textContent = content;
  }

  setListeners(listeners) {
    listeners.forEach((listener) => {
      this.element.addEventListener(listener.event, listener.handler);
    });
  }
}
