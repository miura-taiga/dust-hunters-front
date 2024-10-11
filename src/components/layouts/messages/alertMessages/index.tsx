'use client';

import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertMessageProps {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  severity,
  autoHideDuration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [autoHideDuration, onClose]);

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
    >
      <Alert severity={severity} variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
