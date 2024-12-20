'use client';

import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)({
  backgroundColor: '#1E3A8A',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: '12px 24px',
  border: '2px solid #C0C0C0',
  borderRadius: '10px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
  transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
  '&:hover': {
    backgroundColor: '#3B82F6',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: '#1E40AF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
    transform: 'scale(0.95)',
  },
});

interface BasicButtonProps extends ButtonProps {
  text: string;
}

const MonsterHunterButton: React.FC<BasicButtonProps> = ({
  text,
  ...props
}) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

export default MonsterHunterButton;
