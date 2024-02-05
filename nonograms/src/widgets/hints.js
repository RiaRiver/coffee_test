import { Element } from '../utils';
import { HintCell } from '../components';

export class Hints extends Element {
  hints = [];

  /**
   * Constructor for creating a new instance of Hints.
   *
   * @param {type} type - The type of the hints (horizontal, vertical)
   * @param {array} hints - The array of hints to create the block from.
   * @return {Hints} An instance of the Hints class
   */
  constructor(type, hints) {
    super('div', '', { class: `hints hints_${type}` });

    this.type = `${type}Hints`;
    this.createHintsBlock(hints);
    this.render();
  }

  /**
   * Render the Cell elements to the Hints.
   */
  render() {
    this.hints.forEach((row) => {
      const hintsWrapper = new Element('ul', '', { class: 'cells-wrapper' });
      row.forEach((cell) => hintsWrapper.getElement().append(cell.getElement()));
      this.element.append(hintsWrapper.getElement());
    });
  }

  /**
   * Creates a hints block of Cells based on the given hints.
   *
   * @param {array} hints - The array of hints to create the block from.
   */
  createHintsBlock(hints) {
    const size = Math.max(...hints.map((row) => row.length));
    let index = 0;

    hints.forEach((row) => {
      const cells = [];

      for (let i = 0; i < size; i += 1) {
        const value = row[row.length - size + i] || '';
        const hintCell = new HintCell(this.type, index, value);
        hintCell.setListeners([
          { event: 'click', handler: this.handleClick.bind(hintCell) },
          { event: 'contextmenu', handler: (event) => { event.preventDefault(); } }]);
        cells.push(hintCell);
        index += 1;
      }

      this.hints.push(cells);
    });
  }

  /**
   * Handles the click event on the Hint cells
   *
   * @param {Event} event - the click event
   */
  handleClick(event) {
    if (!this.cellActive) return;

    const { target } = event;
    if (!target.textContent) return;

    if (this.state === 8) {
      this.setState(0);
    } else this.setState(8);
  }

  /**
   * Reset all hints cells to a default state.
   */
  reset() {
    this.hints.flat().forEach((fieldCell) => fieldCell.setState(0));
  }

  /**
   * Set the state of the field based on the provided state array.
   *
   * @param {array} state - An array containing the state to set for each fieldCell
   */
  setState(state) {
    this.hints.flat().forEach((fieldCell, index) => {
      fieldCell.setState(state[index]);
    });
  }
}
