'use client';

import { GitHub } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, Link, Box, SvgIcon } from '@mui/material';

// カスタムXアイコンの定義
const XIcon = (props: any) => (
  <SvgIcon
    {...props}
    viewBox="0 0 512 512"
    style={{ width: '50px', height: '38px', color: 'white' }}
  >
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </SvgIcon>
);

export default function Footer() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1C1C1C',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '150px',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingTop: '30px',
          paddingBottom: '60px',
        }}
      >
        {/* プライバシーポリシーなどのリンクをレスポンシブ対応 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4,
            gap: { xs: 2, md: 8 },
          }}
        >
          <Link
            href="#"
            underline="hover"
            sx={{ color: 'white', '&:hover': { color: 'gray' } }}
          >
            プライバシーポリシー
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{ color: 'white', '&:hover': { color: 'gray' } }}
          >
            利用規約
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{ color: 'white', '&:hover': { color: 'gray' } }}
          >
            お問い合わせ
          </Link>
        </Box>
        {/* ソーシャルメディアアイコン */}
        <Box className="flex space-x-4">
          {/* GitHubアイコン */}
          <Link href="#" color="inherit">
            <GitHub
              fontSize="large"
              className="text-white transition-opacity hover:scale-110 hover:text-gray-400 hover:opacity-40"
            />
          </Link>
          {/* Xアイコン */}
          <Link href="#" color="inherit">
            <XIcon
              fontSize="large"
              className="text-white transition-opacity hover:scale-110 hover:text-gray-400 hover:opacity-40"
            />
          </Link>
        </Box>

        {/* フッターの著作権情報 */}
        <Typography variant="body2" className="mt-6 text-gray-400">
          © 2024 Dust Hunters. All Rights Reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
