export const getRandomIndex = (length) => Math.floor(Math.random() * length);

export const transposeMatrix = (matrix) => {
  const patternTransposed = Array.from(new Array(matrix[0].length), () => []);
  matrix.forEach((row, rowInd) => {
    row.forEach((item, colInd) => {
      patternTransposed[colInd][rowInd] = item;
    });
  });

  return patternTransposed;
};

export const createField = (puzzle) => {
  const pattern = puzzle.scheme
    .split(',')
    .map((item) => item.trim())
    .map((item) => Array(Number.parseInt(item, 10)).fill(item.at(-1) === 'x' ? 1 : 0))
    .flat();

  const field = [];
  pattern.forEach((item, ind) => {
    const row = Math.floor(ind / puzzle.rows);
    if (!field[row]) field[row] = [];
    field[row].push(item);
    return field;
  });

  return field;
};

export const getHints = (field) => field.map((row) => row
  .join('')
  .split('0')
  .filter((arr) => arr.length)
  .map((arr) => arr.length));

export const createNonogram = (puzzle) => {
  const difficulty = `${puzzle.cols} x ${puzzle.rows}`;
  const field = createField(puzzle);
  const horizontalHints = getHints(field);
  const verticalHints = getHints(transposeMatrix(field));

  const nonogram = {
    ...puzzle, difficulty, field, horizontalHints, verticalHints,
  };
  delete nonogram.scheme;

  return nonogram;
};
