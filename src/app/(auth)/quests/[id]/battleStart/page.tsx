// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Typography } from "@mui/material";
// import { BasicButton, SecondaryButton } from "@/components/layouts";

// const BattleStart = () => {
//   const [countdown, setCountdown] = useState<number>(300);
//   const [isStarted, setIsStarted] = useState(false);
//   const [isTimeUp, setIsTimeUp] = useState(false);

//   useEffect(() => {
//     if (!isStarted) return;

//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (countdown === 0) {
//       setIsTimeUp(true);
//     }
//   }, [countdown, isStarted]);

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${
//       remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
//     }`;
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center">
//       <Image
//         src="/images/monsters/battleStart/Monster5.jpg"
//         alt="Monster"
//         layout="fill"
//         objectFit="cover"
//         quality={100}
//         className="z-0"
//       />
//       <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
//         <p className="text-xl sm:text-2xl md:text-4xl bg-black bg-opacity-50 p-4 rounded-md mt-2 sm:mb-2">
//           5分間掃除をしてモンスターに攻撃しよう！
//         </p>
//       </div>
//       <div className="z-10 relative">
//         {!isStarted ? (
//           <BasicButton
//             text="戦闘開始"
//             onClick={() => setIsStarted(true)}
//             style={{
//               fontSize: "34px",
//               padding: "16px 42px",
//               marginTop: "400px",
//             }}
//           />
//         ) : !isTimeUp ? (
//           <Typography variant="h1" className="text-white">
//             {formatTime(countdown)}
//           </Typography>
//         ) : (
//           <SecondaryButton
//             text="攻撃する"
//             onClick={() => (window.location.href = `/quests/1/battleEnd`)}
//             style={{
//               fontSize: "34px",
//               padding: "16px 42px",
//               marginTop: "400px",
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BattleStart;


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { BasicButton, SecondaryButton } from "@/components/layouts";
import useFetchData from "@/lib/useFetchData";
import { Settings } from "@/config";
import { useParams, useRouter } from "next/navigation";

interface Monster {
  id: number;
  name: string;
  start_battle_image_url: string;
}

const BattleStart = () => {
  const [countdown, setCountdown] = useState<number>(300);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const router = useRouter();
  const params = useParams();  // ルートパラメータを取得
  const questId = params.id;   // URLのidパラメータを取得

  console.log("クエストID取得:", questId); // クエストIDを取得できているか確認

  // モンスターのデータをフェッチ
  const monster = useFetchData<Monster>(questId ? `${Settings.API_URL}/api/v1/monsters/${questId}` : "");

  console.log("フェッチ中のモンスター情報:", monster); // フェッチしたモンスター情報を確認

  useEffect(() => {
    if (!isStarted) return;

    console.log("カウントダウン開始:", countdown); // カウントダウンが開始されたことを確認

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsTimeUp(true);
      console.log("時間切れ"); // カウントダウン終了時の確認
    }
  }, [countdown, isStarted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  // モンスターのデータがロード中の場合
  if (!monster) {
    console.log("モンスター情報をロード中"); // ロード中の確認
    return <p>Loading...</p>;
  }

  console.log("モンスター情報を表示中:", monster); // モンスター情報が表示されていることを確認

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src={monster.start_battle_image_url}
        alt={monster.name}
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
            onClick={() => {
              setIsStarted(true);
              console.log("戦闘開始ボタンが押されました"); // ボタンが押されたことを確認
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
          <SecondaryButton
            text="攻撃する"
            onClick={() => {
              router.push(`/quests/${questId}/battleEnd`);
              console.log("攻撃するボタンが押され、次の画面へ遷移"); // 攻撃ボタンが押され、次に進んだことを確認
            }}
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
