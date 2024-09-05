"use client";

import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SuccessMessageProps {
  message: string;
  autoHideDuration?: number; // 自動で閉じるまでの時間（ミリ秒）
  onClose: () => void; // 手動で閉じる処理
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  autoHideDuration = 3000, // デフォルトは3秒
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 自動で閉じる処理
    }, autoHideDuration);

    // クリーンアップ関数でタイマーをクリア
    return () => {
      clearTimeout(timer);
    };
  }, [autoHideDuration, onClose]);

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // 上部中央に表示
      onClose={onClose}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;
