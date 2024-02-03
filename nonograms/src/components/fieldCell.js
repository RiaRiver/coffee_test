import { Cell } from './cell';

export class FieldCell extends Cell {
  constructor(index) {
    super('', { class: 'cell field__cell' });

    this.element.dataset.index = index;
  }
}
