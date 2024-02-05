import { storage } from '../services';
import { Element } from '../utils';
import { Modal } from './modal';
import { ResultRow } from '../components';

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
    this.resultRows = [];
    const resultsTable = new Element('ul', '', { class: 'modal__table' });
    const headerRow = new ResultRow('results__header');

    const headerTexts = { name: 'Name', difficulty: 'Difficulty', time: 'Time' };
    headerRow.setRow(headerTexts);
    this.resultRows.push(headerRow);

    const results = storage.loadResults();
    results.forEach((result) => {
      const resultRow = new ResultRow('result__row');
      resultRow.setRow(result);
      this.resultRows.push(resultRow);
    });

    resultsTable.mountComponents([...this.resultRows]);
    this.setContent([resultsTable]);
  }
}
