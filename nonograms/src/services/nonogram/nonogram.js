import { puzzles } from './puzzles';
import {
  getRandomIndex, transposeMatrix, createField, getHints,
} from './helpers';

class Nonogram {
  constructor(puzzle) {
    this.nonograms = puzzles
      .filter((puzzle) => puzzle.scheme)
      .map(this.createNonogram);
  }

  createNonogram = (puzzle) => {
    const field = createField(puzzle);
    const horizontalHints = getHints(field);
    const verticalHints = getHints(transposeMatrix(field));

    const nonogram = {
      ...puzzle, field, horizontalHints, verticalHints,
    };
    delete nonogram.scheme;

    return nonogram;
  };

  getNonogram = (id = '011') => {
    const nonogram = {
      ...(this.nonograms.find((item) => item.id === id)),
    };
    delete nonogram.field;

    return nonogram;
  };

  getSolution = (id) => this.nonograms.find((item) => item.id === id).field.flat();

  check = (id, checkedField) => {
    const field = this.getSolution(id);
    return JSON.stringify(field) === JSON.stringify(checkedField);
  };

  getRandomNonogram = () => this.getNonogram(this.nonograms[getRandomIndex(this.nonograms.length)].id);
}

export const nonogram = new Nonogram();
