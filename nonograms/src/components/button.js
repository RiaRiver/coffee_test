import { Element } from '../utils';

export class Button extends Element {
  state = {
    loading: false,
  };

  constructor(textContent, props) {
    super('button', textContent, props);
  }
}
