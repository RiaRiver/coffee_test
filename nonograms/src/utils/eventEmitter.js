export const EVENTS = {
  fieldChange: 'fieldchange',
  gameStart: 'gamestart',
  gameEnd: 'gameend',
  gameReset: 'gamereset',
};

class EventEmitter {
  /**
   * Constructor for creating an instance of the EventEmitter class.
   * @return {EventEmitter} An instance of the EventEmitter class
   */
  constructor() {
    this.events = {};
  }

  /**
   * Emits the specified event with the provided data.
   *
   * @param {string} eventName - The name of the event to emit
   * @param {any} data - The data to be passed to the event handlers
   */
  emit(eventName, ...data) {
    const eventHandlers = this.events[eventName];
    if (eventHandlers) eventHandlers.forEach((handler) => handler(...data));
  }

  /**
   * Register a listener for the specified event.
   *
   * @param {string} eventName - The name of the event to listen for
   * @param {function} handler - The callback function to be executed when the event is triggered
   */
  on(eventName, handler) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(handler);
  }

  /**
   * Removes the specified event handler from the events object.
   *
   * @param {string} eventName - The name of the event
   * @param {function} handler - The event handler function to be removed
   */
  remove(eventName, handler) {
    const eventHandlers = this.events[eventName];
    if (eventHandlers) {
      this.events[eventName] = eventHandlers
        .filter((eventHandler) => eventHandler.name !== handler);
    }
  }
}

export const eventEmitter = new EventEmitter();
