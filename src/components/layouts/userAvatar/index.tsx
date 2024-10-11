'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { Settings } from '@/config';
import { useAuth } from '@/contexts/auth';
import useFetchData from '@/lib/useFetchData';
import { UserData } from '@/types';

const UserAvatar: FC = () => {
  const { googleUserId } = useAuth();
  const [hunterRank, setHunterRank] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const userData = useFetchData<UserData>(
    googleUserId ? `${Settings.API_URL}/api/v1/users/${googleUserId}` : '',
  );

  useEffect(() => {
    console.log('取得したGoogle User ID:', googleUserId);
    console.log('取得したユーザーデータ:', userData);

    if (userData) {
      setHunterRank(userData.hunterRank);
      console.log('設定されたハンターランク:', userData.hunterRank);
      setGender(userData.gender);
      console.log('設定された性別:', userData.gender);
    }
  }, [userData, googleUserId]);

  const imageUrl = gender ? `/images/userAvatars/${gender}.jpg` : '';

  if (!googleUserId) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 flex flex-col items-center">
      {/* アバター */}
      <div className="relative flex size-24 items-center justify-center rounded-full bg-[#1E3A8A] shadow-md">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="User Avatar"
            className="rounded-full"
            width={90}
            height={90}
          />
        )}
      </div>
      {/* ハンターランク */}
      {hunterRank !== null && (
        <div className="absolute bottom-[-8px] right-[-8px] flex h-8 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[#1E3A8A] shadow-md">
          HR: {hunterRank}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
