import { puzzles } from './puzzles.js';

const transposeMatrix = (matrix) => {
  const patternTransposed = Array.from(new Array(matrix[0].length), () => []);
  matrix.forEach((row, rowInd) => {
    row.forEach((item, colInd) => {
      patternTransposed[colInd][rowInd] = item;
    });
  });

  return patternTransposed;
};

const createField = (puzzle) => {
  const pattern = puzzle.scheme
    .split(',')
    .map((item) => item.trim())
    .map((item) => Array(Number.parseInt(item)).fill(item.at(-1) === 'x' ? 1 : 0))
    .flat();

  const field = pattern.reduce((matrix, item, ind) => {
    const row = Math.floor(ind / puzzle.rows);
    if (!matrix[row]) matrix[row] = [];
    matrix[row].push(item);
    return matrix;
  }, []);

  return field;
};

const getHints = (field) => field.map((row) => row
  .join('')
  .split('0')
  .filter((arr) => arr.length)
  .map((arr) => arr.length));

const createNonogram = (puzzle) => {
  const field = createField(puzzle);
  const horizontalHints = getHints(field);
  const verticalHints = getHints(transposeMatrix(field));

  const nonogram = {
    ...puzzle, field, horizontalHints, verticalHints,
  };
  delete nonogram.scheme;

  return nonogram;
};

const nonograms = puzzles
  .filter((puzzle) => puzzle.scheme)
  .map(createNonogram);

export const getNonogram = (id = '011') => {
  const nonogram = {
    ...(nonograms.find((item) => item.id === id)),
  };
  delete nonogram.field;
  console.log('getNonogram ~ nonogram:', nonogram);

  return nonogram;
};

export const check = (id, checkedField) => {
  console.log('checkSolution ~ checkedField:', checkedField);
  const { field } = nonograms.find((item) => item.id === id);
  console.log('checkSolution ~ field:', field);
  return JSON.stringify(field) === JSON.stringify(checkedField);
};
