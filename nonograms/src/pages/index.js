import { Element } from '../utils';
import { GameContainer } from '../widgets';
import { getNonogram } from '../nonogram';
import { Button } from '../components';
import { storage } from '../storage';

export class MainPage extends Element {
  constructor() {
    super('main', '', { class: 'main' });

    this.render();
  }

  render() {
    const menu = new Element('div', '', { class: 'game__menu' });
    const resetBtn = new Button('Reset', { class: 'btn btn_reset' });
    const saveBtn = new Button('Save', { class: 'btn btn_save' });
    const loadBtn = new Button('Load', { class: 'btn btn_load' });

    const gameContainer = new GameContainer(getNonogram());

    const saveGame = () => {
      const gameState = gameContainer.getState();
      storage.saveGame(gameState);
    };

    const loadGame = () => {
      const loadState = storage.loadGame();
      gameContainer.setState(loadState);
    };

    resetBtn.setListeners([{
      event: 'click', handler: gameContainer.reset,
    }]);

    saveBtn.setListeners([{
      event: 'click',
      handler: saveGame,
    },
    ]);

    loadBtn.setListeners([{
      event: 'click',
      handler: loadGame,
    }]);

    menu.getElement().append(resetBtn.getElement(), saveBtn.getElement(), loadBtn.getElement());
    this.element.append(menu.getElement(), gameContainer.getElement());
  }
}
