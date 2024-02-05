import { store } from '../store';
import { EVENTS, Element, eventEmitter } from '../utils';
import { DropDownButton } from './dropDownButton';

export class SelectMenu extends Element {
  constructor() {
    super('div', '', { class: 'select-menu' });
    this.nonogramList = store.getStore('nonogramList');
    this.render();

    eventEmitter.on(EVENTS.difficultyChange, this.updateNames);
  }

  render() {
    this.difficultyBtn = new DropDownButton(Object
      .keys(this.nonogramList), EVENTS.difficultyChange);
    const names = this.nonogramList[this.difficultyBtn.getState()].map((item) => item.name);
    this.namesBtn = new DropDownButton(names);

    this.mountComponents([this.difficultyBtn,
      this.namesBtn]);
  }

  updateNames = (isCLick) => {
    const difficulty = this.difficultyBtn.getState();
    this.namesBtn.renderList(this.nonogramList[difficulty].map((item) => item.name));

    if (isCLick) {
      this.updateName(this.nonogramList[difficulty][0].name);
    }
  };

  updateSelects = () => {
    const { difficulty } = store.getState('nonogram');
    this.difficultyBtn.changeState(difficulty);
    this.updateName(store.getState('nonogram').name);
  };

  updateName = (name) => {
    this.namesBtn.changeState(name);
  };

  getSelected = () => ({
    difficulty: this.difficultyBtn.getState(),
    name: this.namesBtn.getState(),
  });
}
