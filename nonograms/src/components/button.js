import { Element } from '../utils';

export class Button extends Element {
  state = {
    disabled: false,
  };

  /**
   * Constructor for creating a new instance of Button
   *
   * @param {string} textContent - The text content to be added to the element
   * @param {object} props - The properties to be added to the element
   * @return {Button} An instance of Button
   */
  constructor(textContent, props) {
    super('button', textContent, props);
  }

  /**
   * Set the disabled state of the element and its corresponding state property.
   *
   * @param {boolean} disabled - The new disabled state
   */
  setDisabled(disabled) {
    this.state.disabled = disabled;
    this.element.disabled = disabled;
  }
}
