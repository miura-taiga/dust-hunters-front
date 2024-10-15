'use client';

import LoginIcon from '@mui/icons-material/Login';
import { BasicButton } from '@/components/layouts';
import { Settings } from '@/config';

const LoginButton: React.FC = () => {
  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = `${Settings.API_URL}/auth/google_oauth2`;
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <BasicButton
      text="ログイン"
      startIcon={<LoginIcon />}
      onClick={handleGoogleAuth}
    />
  );
};

export default LoginButton;
