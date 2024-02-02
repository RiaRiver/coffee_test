import { Element } from '../utils';
import { Form } from '../widgets';

export class MainPage extends Element {
  constructor() {
    super('main', '', { class: 'main' });

    this.render();
  }

  render() {
    const form = new Form();
    const form2 = new Form();
    this.element.append(form.getElement(), form2.getElement());
  }
}
