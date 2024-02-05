import { Element, eventEmitter } from '../utils';
import { Button } from '../components';

export class DropDownButton extends Element {
  constructor(list, changeEvent) {
    super('div', '', { class: 'dropdown-btn' });

    [this.state] = list;
    this.changeEvent = changeEvent;
    this.render(list);
  }

  render(list) {
    this.button = new Button(this.state, { class: 'dropdown-btn__btn' });
    this.list = new Element('ul', '', { class: 'dropdown-btn__list' });

    this.renderList(list);
    this.mountComponents([this.button, this.list]);
  }

  renderList(list) {
    console.log('renderList', list);
    this.items = list.map((item) => {
      const element = new Element('li', item, { class: 'dropdown-btn__item' });
      element.state = item;

      element.setListeners([{
        event: 'click',
        handler: this.changeState.bind(this, element.state),
      }]);
      return element;
    });

    this.button.setListeners([
      {
        event: 'click',
        handler: this.handleDropDown,
      },
    ]);

    this.list.mountComponents(this.items, 'replaceChildren');
  }

  handleDropDown = () => {
    if (this.list.open === true) {
      this.list.element.classList.remove('dropdown-btn__list_open');
      this.list.open = false;
    } else {
      this.list.open = true;
      this.list.element.classList.add('dropdown-btn__list_open');
    }
  };

  changeState = (state) => {
    this.state = state;
    this.button.setContent(state);
    this.list.element.classList.remove('dropdown-btn__list_open');
    this.list.open = false;

    eventEmitter.emit(this.changeEvent);
  };

  getState() {
    return this.state;
  }
}
