'use client';

import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';

const CustomTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const { googleUserId } = useAuth();

  const tabPaths = googleUserId
    ? [
        `/guildCards/encyclopedias/${googleUserId}`,
        `/guildCards/dailyHuntLog/${googleUserId}`,
        `/guildCards/cleanAreaGraph/${googleUserId}`,
      ]
    : [];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (googleUserId) {
      router.push(tabPaths[newValue]);
    }
  };

  if (!googleUserId) {
    return null;
  }

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          height: '64px',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="navigation tabs"
          variant="fullWidth"
          className="rounded-md shadow-md"
          TabIndicatorProps={{
            style: {
              height: '4px',
            },
          }}
        >
          <Tab
            icon={<BookIcon />}
            iconPosition="start"
            label="図鑑"
            className="font-semibold text-gray-500 lg:text-lg lg:font-bold"
            sx={{
              paddingY: { xs: '8px', lg: '16px' },
              fontSize: { xs: '12px', sm: '14px', lg: '16px' },
              '& .MuiTab-wrapper': {
                whiteSpace: 'nowrap',
              },
            }}
          />
          <Tab
            icon={<HistoryIcon />}
            iconPosition="start"
            label="活動履歴"
            className="font-semibold text-gray-500 lg:text-lg lg:font-bold"
            sx={{
              paddingY: { xs: '8px', lg: '16px' },
              fontSize: { xs: '12px', sm: '14px', lg: '16px' },
              '& .MuiTab-wrapper': {
                whiteSpace: 'nowrap',
              },
            }}
          />
          <Tab
            icon={<LocationOnIcon />}
            iconPosition="start"
            label="掃除場所"
            className="font-semibold text-gray-500 lg:text-lg lg:font-bold"
            sx={{
              paddingY: { xs: '8px', lg: '16px' },
              fontSize: { xs: '12px', sm: '14px', lg: '16px' },
              '& .MuiTab-wrapper': {
                whiteSpace: 'nowrap',
              },
            }}
          />
        </Tabs>
      </Box>
    </div>
  );
};

export default CustomTabs;
