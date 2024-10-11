'use client';

import AlertMessage from '@/components/layouts/messages/alertMessages';

interface WarningMessageProps {
  message: string;
  autoHideDuration?: number;
  onClose: () => void;
}

const WarningMessage: React.FC<WarningMessageProps> = ({
  message,
  autoHideDuration,
  onClose,
}) => (
  <AlertMessage
    message={message}
    severity="warning"
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  />
);

export default WarningMessage;
