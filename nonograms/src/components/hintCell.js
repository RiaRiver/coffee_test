import { Cell } from './cell';

export class HintCell extends Cell {
  constructor(index, textContent) {
    super(textContent, { class: 'cell hint__cell' });

    this.element.dataset.index = index;
  }
}
