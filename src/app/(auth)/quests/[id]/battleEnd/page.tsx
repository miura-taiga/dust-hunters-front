'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { BasicButton, BlackButton, Loading } from '@/components/layouts';
import { Settings } from '@/config';
import { Setting } from '@/config';
import useFetchData from '@/lib/useFetchData';
import { Monster } from '@/types';

const BattleEnd = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const questId = params.id;

  const monster = useFetchData<Monster>(
    questId ? `${Settings.API_URL}/api/v1/monsters/${questId}` : '',
  );

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsLoading(false);
  };

  const handleShare = () => {
    const appUrl = Setting.FRONT_URL;
    const text = `${monster?.name}を討伐完了！`;
    const hashtags = 'DustHunters';

    console.log('App URL:', appUrl);
    console.log('Share Text:', text);
    console.log('Hashtags:', hashtags);
    console.log('Image URL:', imageUrl);

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(appUrl)}&hashtags=${encodeURIComponent(
      hashtags,
    )}`;

    console.log('Share URL:', shareUrl);

    window.open(shareUrl, '_blank');
  };

  const imageUrl = `${Setting.FRONT_URL}/images/layouts/ogp.png`;

  if (!monster) {
    return <Loading />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between p-4">
      {isLoading && (
        <div className="absolute z-50 flex size-full items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}

      <Image
        src={monster.end_battle_image_url}
        alt="Battle End Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
        onLoadingComplete={handleImageLoad}
      />

      {isImageLoaded && (
        <>
          <div className="absolute left-1/2 top-10 z-10 w-full max-w-[90%] -translate-x-1/2 text-4xl font-bold text-white sm:max-w-[44%]">
            <p className="mt-2 rounded-md bg-black/50 px-6 py-4 text-left text-xl sm:mb-2 sm:text-2xl md:text-4xl">
              討伐完了！掃除の成果をXに共有しよう！
            </p>
          </div>
          <div className="z-10 mb-48 mt-auto flex w-full max-w-2xl flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Link href={'/quests'}>
              <BasicButton text="クエスト一覧" />
            </Link>
            <BlackButton text={'Xに共有する'} onClick={handleShare} />
          </div>
        </>
      )}
    </div>
  );
};

export default BattleEnd;
