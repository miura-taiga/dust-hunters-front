"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { BasicButton, SecondaryButton, Loading } from "@/components/layouts";
import useFetchData from "@/lib/useFetchData";
import { Settings } from "@/config";
import { useParams, useRouter } from "next/navigation";
import { Monster } from "@/types";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/contexts/auth";

const BattleStart = () => {
  const { googleUserId } = useAuth();
  const [countdown, setCountdown] = useState<number>(3);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const questId = params.id;

  const monster: Monster | undefined = useFetchData<Monster>(
    questId ? `${Settings.API_URL}/api/v1/monsters/${questId}` : ""
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

  const handleAttack = async () => {
    try {
      if (!googleUserId) {
        throw new Error("ユーザーIDが取得できませんでした。");
      }

      if (!monster) {
        throw new Error("モンスターデータが取得できませんでした。");
      }

      const response = await fetcher(
        `${Settings.API_URL}/api/v1/guild_cards/${googleUserId}/increment_defeat_count`,
        "POST",
        {
          monster_id: monster.id,
        }
      );

      if (response) {
        router.push(`/quests/${questId}/battleEnd`);
      } else {
        setErrorMessage("攻撃に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "エラーが発生しました"
      );
    }
  };

  if (!monster) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {isLoading && (
        <div className="absolute z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
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
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
            <p className="text-xl sm:text-2xl md:text-4xl bg-black bg-opacity-50 p-4 rounded-md mt-2 sm:mb-2">
              5分間掃除をしてモンスターに攻撃しよう！
            </p>
          </div>
          <div className="z-10 relative">
            {!isStarted ? (
              <BasicButton
                text="戦闘開始"
                onClick={() => {
                  setIsStarted(true);
                }}
                style={{
                  fontSize: "34px",
                  padding: "16px 42px",
                  marginTop: "400px",
                }}
              />
            ) : !isTimeUp ? (
              <Typography variant="h1" className="text-white">
                {formatTime(countdown)}
              </Typography>
            ) : (
              <>
                {errorMessage && (
                  <Typography variant="body1" color="error">
                    {errorMessage}
                  </Typography>
                )}
                <SecondaryButton
                  text="攻撃する"
                  onClick={handleAttack}
                  style={{
                    fontSize: "34px",
                    padding: "16px 42px",
                    marginTop: "400px",
                  }}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BattleStart;
