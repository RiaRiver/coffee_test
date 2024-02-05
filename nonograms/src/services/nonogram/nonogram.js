import { puzzles } from './puzzles';
import {
  getRandomIndex, createNonogram,
} from './helpers';

class Nonogram {
  nonograms = puzzles
    .filter((puzzle) => puzzle.scheme)
    .map(createNonogram);

  getNonogram = (id = '011') => {
    const nonogram = {
      ...(this.nonograms.find((item) => item.id === id)),
    };
    delete nonogram.field;

    return nonogram;
  };

  getNonogramList = () => this.nonograms.reduce((obj, item) => {
    const {
      difficulty, id, name,
    } = item;
    if (!obj[difficulty]) obj[difficulty] = [];
    obj[difficulty].push({ id, name });
    return obj;
  }, {});

  getSolution = (id) => this.nonograms.find((item) => item.id === id).field.flat();

  check = (id, checkedField) => {
    const field = this.getSolution(id);
    return JSON.stringify(field) === JSON.stringify(checkedField);
  };

  getRandomNonogram = () => this.getNonogram(
    this.nonograms[getRandomIndex(this.nonograms.length)].id,
  );
}

export const nonogram = new Nonogram();
