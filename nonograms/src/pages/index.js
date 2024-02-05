import { Element } from '../utils';
import { GameContainer, ModalResults } from '../widgets';
import {
  nonogramService,
  storage,
} from '../services';
import { Button } from '../components';
import { EVENTS, eventEmitter } from '../utils/eventEmitter';
import { store } from '../store/store';
import { ModalWin } from '../widgets/modalWin';

export class MainPage extends Element {
  constructor() {
    super('main', '', { class: 'main' });

    this.render();

    eventEmitter.on(EVENTS.gameStart, this.startGame);
    eventEmitter.on(EVENTS.gameEnd, this.endGame);
    eventEmitter.on(EVENTS.fieldChange, this.checkSolution);
  }

  render() {
    const menu = new Element('div', '', { class: 'game__menu' });
    this.themeBtn = new Button('theme', { class: 'btn btn_theme' });
    this.resetBtn = new Button('Reset', { class: 'btn btn_reset' });
    this.saveBtn = new Button('Save', { class: 'btn btn_save' });
    this.loadBtn = new Button('Load', { class: 'btn btn_load' });
    this.solutionBtn = new Button('Solution', { class: 'btn btn_solution' });
    this.resultsBtn = new Button('Results', { class: 'btn results' });
    this.randomBtn = new Button('Random', { class: 'btn btn_random' });
    this.winModal = new ModalWin();
    this.resultsModal = new ModalResults();

    this.loadBtn.setDisabled(!storage.hasSave());

    const nonogram = nonogramService.getNonogram();
    store.setState('nonogram', nonogram);
    this.gameContainer = new GameContainer(nonogram);

    this.themeBtn.setListeners([{
      event: 'click', handler: this.toggleTheme,
    }]);
    this.resetBtn.setListeners([{
      event: 'click', handler: this.resetGame,
    }]);

    this.saveBtn.setListeners([{
      event: 'click',
      handler: this.saveGame,
    },
    ]);

    this.loadBtn.setListeners([{
      event: 'click',
      handler: this.loadGame,
    }]);

    this.solutionBtn.setListeners([{
      event: 'click',
      handler: this.showSolution,
    }]);

    this.randomBtn.setListeners([{
      event: 'click',
      handler: this.startRandomGame,
    }]);
    this.resultsBtn.setListeners([{
      event: 'click',
      handler: this.resultsModal.show,
    }]);

    menu.mountComponents([
      this.themeBtn,
      this.resetBtn,
      this.saveBtn,
      this.loadBtn,
      this.solutionBtn,
      this.randomBtn,
      this.resultsBtn]);
    this.mountComponents([menu, this.gameContainer, this.winModal, this.resultsModal]);
  }

  toggleTheme = () => {
    const page = document.documentElement;
    const { theme } = page.dataset;
    page.dataset.theme = theme === 'light' ? 'dark' : 'light';
  };

  resetGame = () => {
    eventEmitter.emit(EVENTS.gameReset);
    store.setState('gameActive', false);
    this.saveBtn.setDisabled(false);
    this.gameContainer.reset();
  };

  saveGame = () => {
    storage.saveGame(store.getState());
    this.loadBtn.setDisabled(false);
  };

  loadGame = () => {
    eventEmitter.emit(EVENTS.gameReset);
    store.setState('gameActive', false);
    this.saveBtn.setDisabled(false);
    const { nonogram: { id }, ...gameState } = storage.loadGame();
    const nonogram = nonogramService.getNonogram(id);
    store.setState('nonogram', nonogram);
    this.gameContainer.render(nonogram);
    this.gameContainer.setState(gameState);
  };

  showSolution = () => {
    eventEmitter.emit(EVENTS.gameEnd);
    const solution = nonogramService.getSolution(store.getState('nonogram').id);
    this.gameContainer.setState({ field: solution });
  };

  startRandomGame = () => {
    eventEmitter.emit(EVENTS.gameReset);
    this.saveBtn.setDisabled(false);
    const nonogram = nonogramService.getRandomNonogram();
    store.resetState();
    store.setState('nonogram', nonogram);
    this.gameContainer.render(nonogram);
  };

  checkSolution = () => {
    const { nonogram: { id }, field } = store.getState();
    const fieldState = field.map((state) => (state !== 1 ? 0 : state));
    const isWin = nonogramService.check(id, fieldState);
    if (isWin) {
      eventEmitter.emit(EVENTS.gameEnd);
      this.saveResult();
      this.winModal.show();
    }
  };

  saveResult = () => {
    const { time, nonogram: { name, cols, rows } } = store.getState();
    storage.saveResult({ name, difficulty: `${cols}x${rows}`, time });
  };

  startGame = () => {
    store.setState('gameActive', true);
  };

  endGame = () => {
    this.saveBtn.setDisabled(true);
    store.setState('gameActive', false);
  };
}
