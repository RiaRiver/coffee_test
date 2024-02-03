import { Element } from '../utils';

const views = {
  0: '',
  1: 'fill',
  8: 'cross',
};

export class Cell extends Element {
  state = 0;

  constructor(textContent, props) {
    super('li', textContent, props);
  }

  setView() {
    this.element.dataset.view = views[this.state];
  }

  setState(state) {
    this.state = state;
    this.setView();
  }

  getState() {
    return this.state;
  }
}
