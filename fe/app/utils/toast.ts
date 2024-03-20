import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export type ToastType = 'success' | 'error';

export interface Toast {
  text: string;
  type: ToastType;
  time: number;
}

export default function toast({ text, type, time }: Toast) {
  toastEventManager.emit('toast', { text, type, time });
}
