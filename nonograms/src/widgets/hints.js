import { Element } from '../utils';
import { HintCell } from '../components';

export class Hints extends Element {
  hints = [];

  constructor(type, hints) {
    super('div', '', { class: `hints hints_${type}` });

    this.createHintsBlock(hints);
    this.render();
  }

  render() {
    this.hints.forEach((row) => {
      const hintsWrapper = new Element('ul', '', { class: 'cells-wrapper' });
      row.forEach((cell) => hintsWrapper.getElement().append(cell.getElement()));
      this.element.append(hintsWrapper.getElement());
    });
  }

  createHintsBlock(hints) {
    const size = Math.max(...hints.map((row) => row.length));
    let index = 0;

    hints.forEach((row) => {
      const cells = [];

      for (let i = 0; i < size; i += 1) {
        const value = row[row.length - size + i] || '';
        const hintCell = new HintCell(index, value);
        hintCell.setListeners([
          { event: 'click', handler: this.handleClick.bind(hintCell) },
          { event: 'contextmenu', handler: (event) => { event.preventDefault(); } }]);
        cells.push(hintCell);
        index += 1;
      }

      this.hints.push(cells);
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { target } = event;
    if (!target.textContent) return;

    if (target.dataset.view === 'cross') {
      this.setState(0);
    } else this.setState(8);
  }

  reset() {
    this.hints.flat().forEach((fieldCell) => fieldCell.setState(0));
  }

  getState() {
    return this.hints.flat().map((fieldCell) => fieldCell.getState());
  }

  setState(state) {
    this.hints.flat().forEach((fieldCell, index) => {
      fieldCell.setState(state[index]);
    });
  }
}
