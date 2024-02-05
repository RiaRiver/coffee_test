import { Element } from '../utils';

export class Text extends Element {
  /**
   * Constructor for creating an instance of the class Text.
   *
   * @param {Object} props - The properties to be added to the element
   * @return {Text} An instance of the class Text
   */
  constructor(props) {
    super('p', '', props);
  }

  /**
   * Set the text content of the element.
   *
   * @param {string} text - The text to set
   */
  setText(text) {
    this.element.textContent = text;
  }
}
