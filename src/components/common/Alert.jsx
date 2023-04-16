import { useEffect } from 'react';
import AlertModal from 'elements/AlertModal';
import { useModalState } from 'hooks/useModalState';

export default function Alert({
  completeStyle,
  message,
  duration,
  onUnmountButton,
}) {
  const [isErrorModalOpen, toggleErrorModal] = useModalState(true);

  useEffect(() => {
    if (isErrorModalOpen && !onUnmountButton) {
      const progressBarTimer = setTimeout(() => {
        toggleErrorModal(false);
      }, duration);

      return () => {
        clearTimeout(progressBarTimer);
      };
    }
  }, [duration, isErrorModalOpen, toggleErrorModal, onUnmountButton]);

  return (
    <AlertModal
      completeStyle={completeStyle}
      isOpen={isErrorModalOpen}
      message={message}
      progressBarDuration={duration}
      onUnmountButton={onUnmountButton}
    />
  );
}
