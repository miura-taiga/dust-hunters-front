"use client";

import React, { useState, useEffect } from "react";
import {
  GameContainerWrapper,
  QuestBoard,
  QuestDetail,
  MobileDialog,
} from "@/features/quests";
import { SuccessMessage } from "@/components/layouts/messages";
import useFetchData from "@/lib/useFetchData";
import { Settings } from "@/config";
import { Loading } from "@/components/layouts";

interface Quest {
  id: number;
  title: string;
  monster_id: number;
  monsterName: string;
}

interface Monster {
  id: number;
  name: string;
  bestiary_monster_image_url: string;
}

export default function QuestPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const quests = useFetchData<Quest[]>(`${Settings.API_URL}/api/v1/quests`);
  const monsters = useFetchData<Monster[]>(
    `${Settings.API_URL}/api/v1/monsters`
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setSuccessMessage("ログインしました！");
      setShowSuccessMessage(true);
    }
  }, []);

  const handleQuestClick = (questId: number) => {
    setSelectedQuestId(questId);
    if (isMobile) {
      setOpen(true);
    }
  };

  if (!quests || !monsters) {
    return <Loading />;
  }

  return (
    <GameContainerWrapper>
      {/* 成功メッセージの表示 */}
      {showSuccessMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      {/* レイアウト */}
      <div className="w-full max-w-6xl pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          {/* QuestBoardにクエストデータを渡す */}
          <QuestBoard
            quests={quests}
            onQuestClick={handleQuestClick}
            isMobile={isMobile}
          />

          {/* スマホではない場合はQuestDetailを表示 */}
          {!isMobile && (
            <QuestDetail
              questId={selectedQuestId}
              quest={quests.find((q) => q.id === selectedQuestId)}
              monster={monsters.find((m) => m.id === selectedQuestId)}
            />
          )}
        </div>
      </div>

      {/* スマホの場合はMobileDialogを表示 */}
      {isMobile && (
        <MobileDialog
          open={open}
          onClose={() => setOpen(false)}
          questId={selectedQuestId}
          quest={quests.find((q) => q.id === selectedQuestId)}
          monster={monsters.find((m) => m.id === selectedQuestId)}
        />
      )}
    </GameContainerWrapper>
  );
}
