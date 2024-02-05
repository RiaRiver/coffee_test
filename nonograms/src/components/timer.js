import { store } from '../store';
import {
  Element, formattedTime, now, EVENTS, eventEmitter,
} from '../utils';

export class Timer extends Element {
  /**
   * Constructor for creating an instance of the class Timer.
   *
   */
  constructor() {
    super('div', '', { class: 'timer' });

    this.setState(0);
    eventEmitter.on(EVENTS.gameStart, this.startTimer);
    eventEmitter.on(EVENTS.gameEnd, this.stopTimer);
    eventEmitter.on(EVENTS.gameReset, this.reset);
  }

  /**
   * Start the timer and update the time and time state display every second.
   *
   */
  startTimer = () => {
    this.startTime = now() - store.getState('time');
    if (!this.interval) {
      this.interval = setInterval(() => {
        const time = now() - this.startTime;
        store.setState('time', time);
        this.element.textContent = formattedTime(time);
        console.log('tick');
        console.log('state', store.getState('time'));
      }, 1000);
    }
  };

  /**
   * Stops the timer and clears the interval.
   */
  stopTimer = () => {
    clearInterval(this.interval);
    this.interval = 0;
  };

  /**
   * Resets the time state and stops the timer.
   *
   */
  reset = () => {
    this.stopTimer();
    this.setState(0);
  };

  /**
   * Set the time state and update the text content based on the new state.
   *
   * @param {number} state - The new state to set (number of seconds)
   */
  setState(state) {
    store.setState('time', state);
    this.element.textContent = formattedTime(state);
  }
}
