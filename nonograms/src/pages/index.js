import { Element } from '../utils';
import { DropDownButton, GameContainer, ModalResults } from '../widgets';
import {
  nonogramService,
  storage,
} from '../services';
import { Button } from '../components';
import { EVENTS, eventEmitter } from '../utils/eventEmitter';
import { store } from '../store/store';
import { ModalWin } from '../widgets/modalWin';
import { saveResult, toggleTheme } from './helpers';

export class MainPage extends Element {
  nonogramList = nonogramService.getNonogramList();

  saveBtn;

  loadBtn;

  winModal;

  gameContainer;

  constructor() {
    super('main', '', { class: 'main' });

    this.render();

    eventEmitter.on(EVENTS.gameEnd, this.endGame);
    eventEmitter.on(EVENTS.gameReset, this.resetGame);
    eventEmitter.on(EVENTS.fieldChange, this.checkSolution);
    eventEmitter.on(EVENTS.difficultyChange, this.renderNamesList);
  }

  render() {
    this.renderHeader();
    this.renderSelectMenu();
    this.renderGameMenu();

    this.winModal = new ModalWin();

    const nonogram = nonogramService.getNonogram();
    store.setState('nonogram', nonogram);
    this.gameContainer = new GameContainer(nonogram);

    this.mountComponents([this.gameContainer, this.winModal]);
  }

  renderHeader() {
    const header = new Element('header', '', { class: 'header' });
    const title = new Element('h1', 'Nonograms', { class: 'header__title' });
    const themeBtn = new Button('theme', { class: 'btn btn_theme' });
    const resultsBtn = new Button('Results', { class: 'btn results' });
    const resultsModal = new ModalResults();

    themeBtn.setListeners([{
      event: 'click', handler: toggleTheme,
    }]);

    resultsBtn.setListeners([{
      event: 'click',
      handler: resultsModal.show,
    }]);

    header.mountComponents([title, themeBtn, resultsBtn]);
    this.mountComponents([resultsModal, header]);
  }

  renderSelectMenu() {
    this.difficultyBtn = new DropDownButton(Object
      .keys(this.nonogramList), EVENTS.difficultyChange);
    const names = this.nonogramList[this.difficultyBtn.getState()].map((item) => item.name);
    this.namesBtn = new DropDownButton(names);

    this.mountComponents([this.difficultyBtn,
      this.namesBtn]);
  }

  renderGameMenu() {
    const gameMenu = new Element('div', '', { class: 'game__menu' });
    const resetBtn = new Button('Reset', { class: 'btn btn_reset' });
    this.saveBtn = new Button('Save', { class: 'btn btn_save' });
    this.loadBtn = new Button('Load', { class: 'btn btn_load' });
    const solutionBtn = new Button('Solution', { class: 'btn btn_solution' });
    const randomBtn = new Button('Random', { class: 'btn btn_random' });

    resetBtn.setListeners([{
      event: 'click', handler: () => { eventEmitter.emit(EVENTS.gameReset); },
    }]);

    this.saveBtn.setListeners([{
      event: 'click',
      handler: this.saveGame,
    },
    ]);

    this.loadBtn.setDisabled(!storage.hasSave());

    this.loadBtn.setListeners([{
      event: 'click',
      handler: this.loadGame,
    }]);

    solutionBtn.setListeners([{
      event: 'click',
      handler: this.showSolution,
    }]);

    randomBtn.setListeners([{
      event: 'click',
      handler: this.startRandomGame,
    }]);

    gameMenu.mountComponents([
      resetBtn,
      this.saveBtn,
      this.loadBtn,
      solutionBtn,
      randomBtn]);

    this.mountComponents([gameMenu]);
  }

  resetGame = () => {
    store.setState('gameActive', false);
    this.saveBtn.setDisabled(false);
    const { difficulty, name } = store.getState('nonogram');
    this.difficultyBtn.changeState(difficulty);
    this.namesBtn.renderList(this.nonogramList[difficulty].map((item) => item.name));
    this.namesBtn.changeState(name);
  };

  saveGame = () => {
    storage.saveGame(store.getState());
    this.loadBtn.setDisabled(false);
  };

  loadGame = () => {
    const { nonogram: { id }, ...gameState } = storage.loadGame();
    const nonogram = nonogramService.getNonogram(id);
    store.setState('nonogram', nonogram);
    eventEmitter.emit(EVENTS.gameReset);
    this.gameContainer.render(nonogram);
    this.gameContainer.setState(gameState);
  };

  showSolution = () => {
    eventEmitter.emit(EVENTS.gameEnd);
    const solution = nonogramService.getSolution(store.getState('nonogram').id);
    this.gameContainer.setState({ field: solution });
  };

  startRandomGame = () => {
    this.saveBtn.setDisabled(false);
    const nonogram = nonogramService.getRandomNonogram();
    store.resetState();
    store.setState('nonogram', nonogram);
    eventEmitter.emit(EVENTS.gameReset);
    this.gameContainer.render(nonogram);
  };

  checkSolution = () => {
    const { nonogram: { id }, field } = store.getState();
    const fieldState = field.map((state) => (state !== 1 ? 0 : state));
    const isWin = nonogramService.check(id, fieldState);
    if (isWin) {
      eventEmitter.emit(EVENTS.gameEnd);
      this.winModal.show();
      saveResult();
    }
  };

  endGame = () => {
    this.saveBtn.setDisabled(true);
    store.setState('gameActive', false);
  };

  renderNamesList = () => {
    console.log('');
  };
}
