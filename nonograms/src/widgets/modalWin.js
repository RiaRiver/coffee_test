import { Text } from '../components';
import { store } from '../store';
import { Modal } from './modal';

export class ModalWin extends Modal {
  /**
   * Constructor for creating a Win modal.
   */
  constructor() {
    super('Great!');

    this.updateContent();
  }

  /**
   * Update the text of the win modal with a congratulatory message.
   *
   */
  updateContent() {
    this.text = new Text({ class: 'modal__text' });
    this.text.setText(`You have solved the nonogram in ${store.getState('time')} seconds!`);

    this.setContent([this.text]);
  }
}
