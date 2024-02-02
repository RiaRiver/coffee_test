import { Element } from '../../utils';
import { Button, Paragraph, Input } from '../../components';

export class Form extends Element {
  state = {
    text: 'Hello, World!',
  };

  button = new Button('Click', { class: 'button' });

  paragraph = new Paragraph(this.state.text, { class: 'paragraph' });

  input = new Input(null, { class: 'input' });

  constructor() {
    super('div', '', { class: 'form' });

    this.render();
  }

  render() {
    this.button.setListeners([
      { event: 'click', handler: this.handleClick },
      { event: 'mouseover', handler: this.handleHover },
    ]);

    this.input.setListeners([{ event: 'input', handler: this.handleInput }]);

    this.element.append(
      this.input.getElement(),
      this.button.getElement(),
      this.paragraph.getElement(),
    );
  }

  handleClick = () => {
    this.paragraph.setContent(this.state.text);
    this.button.setLoading(true);

    setTimeout(() => this.button.setLoading(false), 2000);
  };

  handleHover = () => {
    console.log('Button Hover!');
  };

  handleInput = (event) => {
    this.state.text = event.target.value;
    // this.paragraph.setContent(this.state.text);
  };
}
