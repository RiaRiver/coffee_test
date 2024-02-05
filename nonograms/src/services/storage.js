const gameKey = 'riariver_nonogram';
const resultsKey = 'riariver_nonogramResults';

const getData = (key) => JSON.parse(localStorage.getItem(key));
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const deleteData = (key) => localStorage.removeItem(key);

export const storage = {
  saveGame: (data) => { setData(gameKey, data); },
  loadGame: () => getData(gameKey),
  saveResult(data) {
    const results = this.loadResults(resultsKey) || [];

    if (results.length === 5) results.shift();
    results.push(data);
    setData(resultsKey, results);
  },
  loadResults: () => getData(resultsKey),

  hasSave: () => !!getData(gameKey),
};
