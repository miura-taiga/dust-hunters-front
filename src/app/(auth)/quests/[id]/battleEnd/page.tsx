"use client";

import { BasicButton, XShareButton } from "@/components/layouts";
import Image from "next/image";
import Link from "next/link";

const BattleEnd = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4">
      <Image
        src={"/images/monsters/ends/monster1.jpg"}
        alt="Battle End Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="-z-10"
      />
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
        <p className="text-2xl sm:text-2xl md:text-4xl bg-black bg-opacity-50 p-4 rounded-md mt-20 sm:mb-6">
          討伐完了！掃除の成果をXに共有しよう！
        </p>
      </div>
      <div className="w-full max-w-2xl flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-auto mb-48 z-10">
        <Link href={"/quests"}>
          <BasicButton text="クエスト一覧" />
        </Link>
        <XShareButton text="Xに共有する" />
      </div>
    </div>
  );
};

export default BattleEnd;
