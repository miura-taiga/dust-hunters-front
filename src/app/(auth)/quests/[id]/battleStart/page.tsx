'use client';

import { Typography } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BasicButton, SecondaryButton, Loading } from '@/components/layouts';
import { Settings } from '@/config';
import { useAuth } from '@/contexts/auth';
import fetcher from '@/lib/fetcher';
import useFetchData from '@/lib/useFetchData';
import { Monster } from '@/types';

const BattleStart = () => {
  const { googleUserId } = useAuth();
  const [countdown, setCountdown] = useState<number>(300);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const questId = params.id;

  const monster: Monster | undefined = useFetchData<Monster>(
    questId ? `${Settings.API_URL}/api/v1/monsters/${questId}` : '',
  );

  useEffect(() => {
    if (!isStarted) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsTimeUp(true);
    }
  }, [countdown, isStarted]);

  useEffect(() => {
    if (countdown === 3) {
      const audio = new Audio('/sounds/Countdown06-2.mp3');
      audio.play();
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsLoading(false);
  };

  const handleStartBattle = async () => {
    if (!googleUserId || !questId) return;

    await fetcher(`${Settings.API_URL}/api/v1/user_quests`, 'POST', {
      quest_id: questId,
    });
    setIsStarted(true);
  };

  const handleAttack = async () => {
    if (!googleUserId || !monster || !questId) return;

    await fetcher(
      `${Settings.API_URL}/api/v1/guild_cards/${googleUserId}/increment_defeat_count`,
      'PATCH',
      { monster_id: monster.id },
    );

    await fetcher(
      `${Settings.API_URL}/api/v1/users/${googleUserId}/increment_hunter_rank`,
      'PATCH',
    );

    await fetcher(
      `${Settings.API_URL}/api/v1/user_quests/${questId}/complete`,
      'PATCH',
    );

    router.push(`/quests/${questId}/battleEnd`);
  };

  if (!monster) {
    return <Loading />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {isLoading && (
        <div className="absolute z-50 flex size-full items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
      <Image
        src={monster.start_battle_image_url}
        alt={monster.name}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
        onLoadingComplete={handleImageLoad}
      />
      {isImageLoaded && (
        <>
          <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-4xl font-bold text-white">
            <p className="mt-2 rounded-md bg-black/50 p-4 text-xl sm:mb-2 sm:text-2xl md:text-4xl">
              5分間掃除をしてモンスターに攻撃しよう！
            </p>
          </div>
          <div className="relative z-10">
            {!isStarted ? (
              <BasicButton
                text="戦闘開始"
                onClick={handleStartBattle}
                style={{
                  fontSize: '34px',
                  padding: '16px 42px',
                  marginTop: '400px',
                }}
              />
            ) : !isTimeUp ? (
              <Typography variant="h1" className="text-white">
                {formatTime(countdown)}
              </Typography>
            ) : (
              <SecondaryButton
                text="攻撃する"
                onClick={handleAttack}
                style={{
                  fontSize: '34px',
                  padding: '16px 42px',
                  marginTop: '400px',
                }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BattleStart;
