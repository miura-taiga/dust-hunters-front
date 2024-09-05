"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BasicButton } from "@/components/layouts";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

interface Quest {
  id: number;
  title: string;
}

const quests: Quest[] = [
  { id: 1, title: "泥土の隠者" },
  { id: 2, title: "彷徨える雪鬼獣" },
  { id: 3, title: "轟く声" },
  { id: 4, title: "ねじれた欲望" },
  { id: 5, title: "大社跡での肝試し" },
  { id: 6, title: "電光雷轟、夢幻泡影" },
  { id: 7, title: "天空の王者、大地の暴君" },
];

const monsterImage = "/images/monsters/encyclopedias/monster_question_mark.jpg";

export default function QuestPage() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(quests[0]);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // 初回レンダリング時とリサイズ時にデバイスのサイズをチェック
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleQuestClick = (quest: Quest) => {
    setSelectedQuest(quest);
    if (isMobile) {
      setOpen(true);
    }
  };

  const handleStartQuest = () => {
    if (selectedQuest) {
      router.push(`/quests/lists/${selectedQuest.id}/battleStart`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/images/layouts/basic_background.jpg')] bg-repeat bg-auto flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* クエスト一覧 */}
          <div className="bg-gray-700 text-white p-4 rounded-lg md:col-span-1">
            <h6 className="text-center text-lg font-semibold mb-4">
              クエスト一覧
            </h6>
            <ul>
              {quests.map((quest) => (
                <li
                  key={quest.id}
                  onClick={() => handleQuestClick(quest)}
                  className={`p-2 mb-2 rounded cursor-pointer ${
                    selectedQuest?.id === quest.id
                      ? "bg-gray-600"
                      : "bg-gray-700"
                  } hover:bg-gray-600`}
                >
                  {quest.title}
                </li>
              ))}
            </ul>
          </div>

          {/* クエスト詳細 (PC画面時に表示) */}
          {!isMobile && selectedQuest && (
            <div className="md:col-span-2 bg-gray-700 text-white p-4 rounded-lg flex flex-col items-center">
              <h6 className="text-lg font-semibold mb-4">
                {selectedQuest.title}
              </h6>
              {/* モンスターの画像 */}
              <Image
                src={monsterImage}
                alt={selectedQuest.title}
                width={200}
                height={200}
                className="mb-4"
              />
              <p className="text-center mb-4">
                {`${selectedQuest.title} 1頭の狩猟`}
              </p>
              <Link href={`/quests/${selectedQuest.id}/battleStart`}>
                <BasicButton text="クエスト出発" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* モバイル版モーダル */}
      {isMobile && open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {selectedQuest?.title}
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="text-center">
            {/* モンスターの画像（モバイル版） */}
            <Image
              src={monsterImage}
              alt={selectedQuest?.title || "モンスター"}
              width={150}
              height={150}
              className="mb-4 mx-auto"
            />
            <p className="mb-4">
              {selectedQuest && `${selectedQuest.title} 1頭の狩猟`}
            </p>
            <Link href={`/quests/${selectedQuest?.id}/battleStart`}>
              <BasicButton text="クエスト出発" />
            </Link>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
