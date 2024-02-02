import { Element } from '../../utils';

export class Paragraph extends Element {
  constructor(textContent, props) {
    super('p', textContent, props);
  }
}
