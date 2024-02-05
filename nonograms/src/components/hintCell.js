import { store } from '../store';
import { Cell } from './cell';

export class HintCell extends Cell {
  /**
   * Constructor for creating an instance of the HintCell class.
   *
   * @param {string} type - The type of the hint cell (horizontal, vertical)
   * @param {number} index - The index of the cell in hint block
   * @param {string} textContent - The text content of the cell
   * @return {HintCell} An instance of the HintCell class
   */
  constructor(type, index, textContent) {
    super(textContent, { class: 'cell hint__cell' });

    this.type = type;
    this.index = index;
    this.element.dataset.index = index;
    store.setStateOfCollection(this.type, this.index, this.state);
  }
}
