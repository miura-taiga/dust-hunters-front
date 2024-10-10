"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { BasicButton, BlackButton, Loading } from "@/components/layouts";
import useFetchData from "@/lib/useFetchData";
import { Settings } from "@/config";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Monster } from "@/types";
import { Setting } from "@/config";

const BattleEnd = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const questId = params.id;

  const monster = useFetchData<Monster>(
    questId ? `${Settings.API_URL}/api/v1/monsters/${questId}` : ""
  );

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsLoading(false);
  };

  const handleShare = () => {
    const appUrl = Setting.FRONT_URL;
    const text = `${monster?.name}を討伐完了！`;
    const hashtags = "DustHunters";

    console.log("App URL:", appUrl);
    console.log("Share Text:", text);
    console.log("Hashtags:", hashtags);
    console.log("Image URL:", imageUrl);

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(appUrl)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;

    console.log("Share URL:", shareUrl);

    window.open(shareUrl, "_blank");
  };

  const imageUrl = `${Setting.FRONT_URL}/images/layouts/ogp.png`;

  if (!monster) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4">
      <Head>
        <title>{`${monster.name}を討伐したよ！`}</title>
        <meta property="og:title" content={`${monster.name}を討伐したよ！`} />
        <meta property="og:description" content="討伐完了！詳細はこちら。" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={Setting.FRONT_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${monster.name}を討伐したよ！`} />
        <meta name="twitter:description" content="討伐完了！詳細はこちら。" />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      {isLoading && (
        <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
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
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
            <p className="text-2xl sm:text-2xl md:text-4xl bg-black bg-opacity-50 p-4 rounded-md mt-20 sm:mb-6">
              討伐完了！掃除の成果をXに共有しよう！
            </p>
          </div>
          <div className="w-full max-w-2xl flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-auto mb-48 z-10">
            <Link href={"/quests"}>
              <BasicButton text="クエスト一覧" />
            </Link>
            <BlackButton text={"Xに共有する"} onClick={handleShare} />
          </div>
        </>
      )}
    </div>
  );
};

export default BattleEnd;
