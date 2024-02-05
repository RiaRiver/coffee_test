import { Element } from '../utils';

export class ResultRow extends Element {
  name;

  difficulty;

  time;

  constructor(className) {
    super('li', '', { class: className });

    this.render();
  }

  render() {
    this.name = new Element('span', '', { class: 'result__name' });
    this.difficulty = new Element('span', '', { class: 'result__difficulty' });
    this.time = new Element('span', '', { class: 'result__time' });

    this.mountComponents([this.name, this.difficulty, this.time]);
  }

  setRow({ name, difficulty, time }) {
    this.name.setContent(name);
    this.difficulty.setContent(difficulty);
    this.time.setContent(time);
  }
}
