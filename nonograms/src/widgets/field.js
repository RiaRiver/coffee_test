import { Element, EVENTS, eventEmitter } from '../utils';
import { FieldCell } from '../components';
import { store } from '../store';

export class Field extends Element {
  field = [];

  /**
   * Constructor for creating a new instance of the Field class.
   *
   * @param {number} rows - The number of rows in the field
   * @param {number} cols - The number of columns in the field
   * @return {Field} An instance of the Field class
   */
  constructor(rows, cols) {
    super('div', '', { class: 'game__field' });

    this.createFieldBlock(rows, cols);
    this.render();
  }

  /**
   * Renders the Cell elements to the Field.
   */
  render() {
    this.field.forEach((row) => {
      const cellsWrapper = new Element('ul', '', { class: 'cells-wrapper' });
      row.forEach((cell) => cellsWrapper.mountComponents([cell]));
      this.mountComponents([cellsWrapper]);
    });
  }

  /**
   * Creates a field block of Cells with the specified number of rows and columns.
   *
   * @param {number} rows - The number of rows in the field block
   * @param {number} cols - The number of columns in the field block
   */
  createFieldBlock(rows, cols) {
    let index = 0;
    for (let row = 0; row < rows; row += 1) {
      const cells = [];
      for (let col = 0; col < cols; col += 1) {
        const cellEl = new FieldCell(index);
        cellEl.setListeners([
          { event: 'click', handler: this.handleClick.bind(cellEl) },
          { event: 'contextmenu', handler: this.handleRightClick.bind(cellEl) }]);
        cells.push(cellEl);
        index += 1;
      }

      this.field.push(cells);
    }
  }

  /**
   * Handles the click event. If the cell is active, it checks if the game is active,
   * and if not, emits the gameStart event.
   * Based on the current state, it toggles the state and emits the fieldChange event.
   */
  handleClick() {
    if (!this.cellActive) return;
    if (!store.getState('gameActive')) {
      eventEmitter.emit(EVENTS.gameStart);
      store.setState('gameActive', true);
    }
    if (this.state === 1) {
      this.setState(0);
    } else this.setState(1);
    eventEmitter.emit(EVENTS.fieldChange);
  }

  /**
   * Handle right click event on the Cell.
   *
   * @param {event} event - the right click event
   */
  handleRightClick(event) {
    event.preventDefault();
    if (!this.cellActive) return;
    if (this.state === 8) {
      this.setState(0);
    } else this.setState(8);
  }

  /**
   * Set the state of the field based on the provided state array.
   *
   * @param {array} state - An array containing the state to set for each fieldCell
   */
  setState(state) {
    this.field.flat().forEach((fieldCell, index) => {
      fieldCell.setState(state[index]);
    });
  }
}
