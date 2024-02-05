import { Element } from '../utils';
import {
  GameContainer, ModalResults, SelectMenu,
} from '../widgets';
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
  saveBtn;

  loadBtn;

  winModal;

  gameContainer;

  constructor() {
    super('main', '', { class: 'main' });

    store.nonogramList = nonogramService.getNonogramList();

    this.render();
    eventEmitter.on(EVENTS.gameEnd, this.endGame);
    eventEmitter.on(EVENTS.gameReset, this.resetGame);
    eventEmitter.on(EVENTS.fieldChange, this.checkSolution);
  }

  render() {
    this.renderHeader();
    this.renderSelectMenu();

    store.setState('nonogram', nonogramService.getNonogram(this.getSelectedId()));
    this.renderControlMenu();

    this.winModal = new ModalWin();

    const nonogram = store.getState('nonogram');
    this.gameContainer = new GameContainer(nonogram);

    this.mountComponents([this.gameContainer, this.winModal]);
  }

  renderHeader() {
    const header = new Element('header', '', { class: 'header' });
    const title = new Element('h1', 'Nonograms', { class: 'header__title' });
    const themeBtn = new Button('Theme', { class: 'btn btn_theme' });
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
    this.selectMenu = new SelectMenu();
    this.selectBtn = new Button('Select', { class: 'btn btn_select' });
    const randomBtn = new Button('Random', { class: 'btn btn_random' });

    this.selectBtn.setListeners([{
      event: 'click',
      handler: (e) => {
        this.startGame(e, this.getSelectedId());
      },
    }]);

    randomBtn.setListeners([{
      event: 'click',
      handler: this.startGame,
    }]);

    this.selectMenu.mountComponents([this.selectBtn, randomBtn]);
    this.mountComponents([this.selectMenu]);
  }

  renderControlMenu() {
    const gameMenu = new Element('div', '', { class: 'control-menu' });
    const resetBtn = new Button('Reset', { class: 'btn btn_reset' });
    this.saveBtn = new Button('Save', { class: 'btn btn_save' });
    this.loadBtn = new Button('Load', { class: 'btn btn_load' });
    const solutionBtn = new Button('Solution', { class: 'btn btn_solution' });

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

    gameMenu.mountComponents([
      this.saveBtn,
      this.loadBtn,
      resetBtn,
      solutionBtn,
    ]);

    this.mountComponents([gameMenu]);
  }

  resetGame = () => {
    store.setState('gameActive', false);
    this.saveBtn.setDisabled(false);
    this.selectMenu.updateSelects();
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
    this.selectMenu.updateSelects();
    this.gameContainer.render(nonogram);
    this.gameContainer.setState(gameState);
  };

  showSolution = () => {
    eventEmitter.emit(EVENTS.gameEnd);
    this.selectMenu.updateSelects();
    const solution = nonogramService.getSolution(store.getState('nonogram').id);
    this.gameContainer.setState({ field: solution });
  };

  startGame = (_, id) => {
    this.saveBtn.setDisabled(false);
    eventEmitter.emit(EVENTS.gameReset);
    const nonogram = id ? nonogramService.getNonogram(id) : nonogramService.getRandomNonogram();
    store.resetState();
    store.setState('nonogram', nonogram);
    this.selectMenu.updateSelects();
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

  getSelectedId = () => {
    const nonogramList = store.getStore('nonogramList');
    const { difficulty, name } = this.selectMenu.getSelected();
    return nonogramList[difficulty].find((item) => item.name === name).id;
  };
}
