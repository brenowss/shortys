type Event = string;
type Payload = any;
type Listener = (payload: Payload) => void;

export default class EventManager {
  private listeners: Map<Event, Listener[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: Event, listener: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(listener);
  }

  emit(event: Event, payload: Payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)!.forEach((listener) => {
      listener(payload);
    });
  }

  removeListener(event: Event, listenerToRemove: Listener) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove
    );

    this.listeners.set(event, filteredListeners);
  }
}
