'use client';

import React from 'react';

import AlertMessage from '@/components/layouts/messages/alertMessages';

interface SuccessMessageProps {
  message: string;
  autoHideDuration?: number;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  autoHideDuration,
  onClose,
}) => (
  <AlertMessage
    message={message}
    severity="success" // 成功メッセージ
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  />
);

export default SuccessMessage;
