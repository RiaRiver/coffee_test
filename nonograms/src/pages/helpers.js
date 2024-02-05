import { storage } from '../services';
import { store } from '../store';

export const toggleTheme = () => {
  const page = document.documentElement;
  const { theme } = page.dataset;
  page.dataset.theme = theme === 'light' ? 'dark' : 'light';
};

export const saveResult = () => {
  const { time, nonogram: { name, cols, rows } } = store.getState();
  storage.saveResult({ name, difficulty: `${cols}x${rows}`, time });
};
