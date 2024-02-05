import { Timer } from '../components/timer';
import { Element } from '../utils';
import { Field } from './field';
import { Hints } from './hints';

export class GameContainer extends Element {
  field;

  horizontalHints;

  verticalHints;

  timer;

  /**
   * Constructor for creating a new instance of the class GameContainer.
   * Generates the game container with Timer, Filed and Hints.
   *
   * @param {nonogram} nonogram - The nonogram object to generate the game
   */
  constructor(nonogram) {
    super('div', '', { class: 'game__container' });

    this.timer = new Timer();
    this.render(nonogram);
  }

  /**
   * Renders the nonogram by creating field, horizontal hints,
   * and vertical hints elements and replacing the children of the element with them.
   *
   * @param {nonogram} nonogram - The nonogram to render
   */
  render(nonogram) {
    this.field = new Field(nonogram.rows, nonogram.cols);
    this.horizontalHints = new Hints('horizontal', nonogram.horizontalHints);
    this.verticalHints = new Hints('vertical', nonogram.verticalHints);

    this.element.replaceChildren(
      this.field.getElement(),
      this.horizontalHints.getElement(),
      this.verticalHints.getElement(),
      this.timer.getElement(),
    );
  }

  /**
   * Reset the field, horizontal and vertical hints, and timer.
   *
   */
  reset = () => {
    this.field.reset();
    this.horizontalHints.reset();
    this.verticalHints.reset();
    this.timer.reset();
  };

  /**
   * Updates the state of the component based on the provided state object.
   *
   * @param {object} state - The new state object containing field, time,
   * horizontalHints, and verticalHints properties.
   */
  setState = (state) => {
    this.field.setState(state.field);

    if (state.time !== undefined) this.timer.setState(state.time);
    if (state.horizontalHints) this.horizontalHints.setState(state.horizontalHints);
    if (state.verticalHints) this.verticalHints.setState(state.verticalHints);
  };
}
