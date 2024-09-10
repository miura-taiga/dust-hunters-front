"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { BasicButton, SecondaryButton } from "@/components/layouts";

const BattleStart = () => {
  const [countdown, setCountdown] = useState<number>(300);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

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

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/images/monsters/battleStart/Monster5.jpg"
        alt="Monster"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
        <p className="text-xl sm:text-2xl md:text-4xl bg-black bg-opacity-50 p-4 rounded-md mt-2 sm:mb-2">
          5分間掃除をしてモンスターに攻撃しよう！
        </p>
      </div>
      <div className="z-10 relative">
        {!isStarted ? (
          <BasicButton
            text="戦闘開始"
            onClick={() => setIsStarted(true)}
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
          <SecondaryButton
            text="攻撃する"
            onClick={() => (window.location.href = `/quests/1/battleEnd`)}
            style={{
              fontSize: "34px",
              padding: "16px 42px",
              marginTop: "400px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BattleStart;
