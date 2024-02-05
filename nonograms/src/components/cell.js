import { store } from '../store';
import { Element, EVENTS, eventEmitter } from '../utils';

const views = {
  0: '',
  1: 'fill',
  8: 'cross',
};

export class Cell extends Element {
  state = 0;

  /**
   * Constructor for creating a new object of Cell.
   *
   * @param {string} textContent - The text content to be added to the element
   * @param {object} props - The properties to be added to the element
   * @return {Cell} An instance of Cell
   */
  constructor(textContent, props) {
    super('li', textContent, props);

    this.cellActive = true;
    eventEmitter.on(EVENTS.gameEnd, this.disableCell);
    eventEmitter.on(EVENTS.gameReset, this.reset);
  }

  /**
   * Set the view for the element based on the current state.
   */
  setView() {
    this.element.dataset.view = views[this.state];
  }

  /**
   * Set the state of the object and update the store and view accordingly.
   *
   * @param {number} state - the new state to set
   */
  setState(state) {
    this.state = state;
    store.setStateOfCollection(this.type, this.index, state);
    this.setView();
  }

  /**
   * Disable the cell.
   */
  disableCell = () => {
    this.cellActive = false;
  };

  reset = () => {
    this.setState(0);
    this.cellActive = true;
  };
}
