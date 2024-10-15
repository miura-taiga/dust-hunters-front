'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth';
import { Settings } from '@/config';
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
    <div className="fixed bottom-20 left-4 flex flex-col items-center z-50">
      {/* アバター */}
      <div className="relative w-24 h-24 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-md">
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
        <div className="absolute bottom-[-8px] right-[-8px] bg-white text-[#1E3A8A] rounded-full w-12 h-8 flex items-center justify-center text-sm font-bold shadow-md">
          HR: {hunterRank}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
