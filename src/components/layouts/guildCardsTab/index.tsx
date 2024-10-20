'use client';

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
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="navigation tabs"
          variant="fullWidth"
          className="rounded-md shadow-md"
        >
          <Tab label="図鑑" className="font-medium text-gray-800" />
          <Tab label="活動履歴" className="font-medium text-gray-800" />
          <Tab label="掃除場所" className="font-medium text-gray-800" />
        </Tabs>
      </Box>
      <div style={{ paddingTop: '48px' }}></div>
    </div>
  );
};

export default CustomTabs;
