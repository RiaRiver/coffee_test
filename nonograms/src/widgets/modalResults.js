import { storage } from '../services';
import { Element } from '../utils';
import { Modal } from './modal';
import { ResultRow, Text } from '../components';

export class ModalResults extends Modal {
  /**
   * Constructor for initializing the Results modal.
   */
  constructor() {
    super('Results');

    this.updateContent();
  }

  /**
   * Update the content of the modal with new results.
   *
   */
  updateContent() {
    const headerRow = new ResultRow('results__header result');

    const results = storage.loadResults() || [];
    results.sort((a, b) => a.time - b.time);

    if (!results.length) {
      const resultsText = new Text({ class: 'modal__text' });
      resultsText.setText('No results yet!');
      this.setContent([resultsText]);
    } else {
      this.resultRows = [];
      const resultsTable = new Element('ul', '', { class: 'modal__table results' });

      const headerTexts = { name: 'Name', difficulty: 'Difficulty', time: 'Time' };
      headerRow.setRow(headerTexts);
      this.resultRows.push(headerRow);
      results.forEach((result) => {
        const resultRow = new ResultRow('results__row result');
        resultRow.setRow(result);
        this.resultRows.push(resultRow);
      });

      resultsTable.mountComponents([...this.resultRows]);
      this.setContent([resultsTable]);
    }
  }
}
