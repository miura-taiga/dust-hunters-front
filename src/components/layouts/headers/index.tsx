'use client';

import { AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { useAuth } from '@/contexts/auth';
import LoginButton from '@/features/loginButton';

export default function Header() {
  const { token } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1E3A8A',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: '70px', md: '80px' },
          justifyContent: 'space-between',
          paddingX: { xs: 2, md: 4 },
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              cursor: 'pointer',
              fontFamily: "'Cinzel', serif",
              color: 'white',
              textAlign: { xs: 'center', md: 'left' },
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
            Dust Hunters
          </Typography>
        </Link>
        {/* トークンがない場合のみ LoginButton を表示 */}
        {!token && <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}
