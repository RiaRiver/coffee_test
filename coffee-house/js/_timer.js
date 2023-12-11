/* eslint-disable no-underscore-dangle */
class IntervalTimer {
  constructor(callback, delay) {
    this.delay = delay;
    this.callback = callback;
    this.count = 0;
    this._elapsedTime = 0;
    this.isResume = false;
  }

  start() {
    // console.log(`start el: ${this._elapsedTime}, rem: ${this.remainingTime}`);

    clearInterval(this.timer);

    if (this.timer) {
      this._elapsedTime = 0;
      this.isResume = false;
    }

    this.startTimestamp = Date.now();

    this.timer = setInterval(() => {
      this.startTimestamp = Date.now();

      // console.log('callback');
      this.callback();

      if (this.isResume) {
        this.start();
      }
    }, this.remainingTime);
  }

  pause() {
    // console.log(`pause el: ${this._elapsedTime}, rem: ${this.remainingTime}`);

    clearInterval(this.timer);

    // eslint-disable-next-line no-self-assign
    this.elapsedTime = this.elapsedTime;
    this.timer = null;
    this.isResume = true;
  }

  get elapsedTime() {
    return this.timer ? this._elapsedTime + Date.now() - this.startTimestamp : this._elapsedTime;
  }

  set elapsedTime(value) {
    this._elapsedTime = value;
  }

  get remainingTime() {
    return this.delay - this.elapsedTime;
  }

  log() {
    setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(`${this.elapsedTime} / ${this.delay} - remain ${this.remainingTime}`);
    }, 500);
  }
}

export default IntervalTimer;
