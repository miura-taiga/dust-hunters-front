'use client';

import React from 'react';

import AlertMessage from '@/components/layouts/messages/alertMessages';

interface ErrorMessageProps {
  message: string;
  autoHideDuration?: number;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  autoHideDuration,
  onClose,
}) => (
  <AlertMessage
    message={message}
    severity="error"
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  />
);

export default ErrorMessage;
