import { Element } from '../utils';
import { FieldCell } from '../components';

export class Field extends Element {
  field = [];

  constructor(rows, cols) {
    super('div', '', { class: 'game__field' });

    this.createFieldBlock(rows, cols);
    this.render();
  }

  render() {
    this.field.forEach((row) => {
      const cellsWrapper = new Element('ul', '', { class: 'cells-wrapper' });
      row.forEach((cell) => cellsWrapper.getElement().append(cell.getElement()));
      this.element.append(cellsWrapper.getElement());
    });
  }

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

  handleClick(event) {
    const { target } = event;
    if (target.dataset.view === 'fill') {
      this.setState(0);
    } else this.setState(1);
  }

  handleRightClick(event) {
    event.preventDefault();
    const { target } = event;
    if (target.dataset.view === 'cross') {
      this.setState(0);
    } else this.setState(8);
  }

  reset() {
    this.field.flat().forEach((fieldCell) => fieldCell.setState(0));
  }

  getState() {
    return this.field.flat().map((fieldCell) => fieldCell.getState());
  }

  setState(state) {
    this.field.flat().forEach((fieldCell, index) => {
      fieldCell.setState(state[index]);
    });
  }
}
