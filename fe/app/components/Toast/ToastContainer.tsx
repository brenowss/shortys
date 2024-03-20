'use client';

import { useCallback, useEffect, useState } from 'react';
import ToastMessage from './ToastMessage';
import { Toast, ToastType, toastEventManager } from '../../utils/toast';

export default function ToastContainer() {
  type Messages = Toast & { id: number };
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    function handleAddToast({
      text,
      type,
      time,
    }: {
      text: string;
      type: ToastType;
      time: number;
    }) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random(),
          text,
          type,
          time,
        },
      ]);
    }

    toastEventManager.on('toast', handleAddToast);

    return () => {
      toastEventManager.removeListener('toast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  }, []);

  return (
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50">
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={() => handleRemoveMessage(message.id)}
        />
      ))}
    </div>
  );
}
