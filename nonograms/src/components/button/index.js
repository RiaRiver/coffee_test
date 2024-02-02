import { Element } from '../../utils';

export class Button extends Element {
  state = {
    loading: false,
  };

  constructor(textContent, props) {
    super('button', textContent, props);
  }

  setLoading(loading) {
    this.state.loading = loading;

    if (this.state.loading) {
      this.element.textContent += '...';
    } else {
      this.element.textContent = this.element.textContent.replace('...', '');
    }
  }
}
