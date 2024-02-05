import { store } from '../store';
import { Cell } from './cell';

export class FieldCell extends Cell {
  /**
   * Constructor for creating a new instance of FieldCell.
   *
   * @param {number} index - The index of the cell in field block
   */
  constructor(index) {
    super('', { class: 'cell field__cell' });

    this.type = 'field';
    this.index = index;
    this.element.dataset.index = index;
    store.setStateOfCollection(this.type, this.index, this.state);
  }
}
