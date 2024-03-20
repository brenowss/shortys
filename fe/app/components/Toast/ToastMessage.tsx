import { useCallback, useEffect } from 'react';
import { Toast } from '../../utils/toast';
import { cn } from '@components/app/lib/utils';

interface ToastMessageProps {
  message: Toast;
  onRemoveMessage: () => void;
}

export default function ToastMessage({
  message,
  onRemoveMessage,
}: ToastMessageProps) {
  const { text, type } = message;

  const handleRemoveToast = useCallback(() => {
    onRemoveMessage();
  }, [onRemoveMessage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRemoveToast();
    }, message.time || 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [message, handleRemoveToast]);

  return (
    <button
      className={cn(
        'p-4 text-white rounded-md shadow-md flex items-center justify-center gap-2 cursor-pointer animate-slide-up bg-opacity-70 mb-2',
        {
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
        }
      )}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
    >
      {type === 'error' && '❌'}
      {type === 'success' && '✅'}
      <strong>{text}</strong>
    </button>
  );
}
