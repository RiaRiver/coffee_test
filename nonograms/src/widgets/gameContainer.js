import { Element } from '../utils';
import { Field } from './field';
import { Hints } from './hints';

export class GameContainer extends Element {
  field;

  horizontalHints;

  verticalHints;

  constructor(nonogram) {
    super('div', '', { class: 'game__container' });

    this.render(nonogram);
  }

  render(nonogram) {
    this.field = new Field(nonogram.rows, nonogram.cols);
    this.horizontalHints = new Hints('horizontal', nonogram.horizontalHints);
    this.verticalHints = new Hints('vertical', nonogram.verticalHints);

    this.element.append(
      this.field.getElement(),
      this.horizontalHints.getElement(),
      this.verticalHints.getElement(),
    );
  }

  reset = () => {
    this.field.reset();
    this.horizontalHints.reset();
    this.verticalHints.reset();
  };

  getState = () => ({
    field: this.field.getState(),
    horizontalHints: this.horizontalHints.getState(),
    verticalHints: this.verticalHints.getState(),
  });

  setState = (state) => {
    this.field.setState(state.field);
    this.horizontalHints.setState(state.horizontalHints);
    this.verticalHints.setState(state.verticalHints);
  };
}
