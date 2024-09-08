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
import { SuccessMessage } from "@/components/layouts/messages";
import styled from "@emotion/styled";

interface Quest {
  id: number;
  title: string;
  monsterName: string;
}

const quests: Quest[] = [
  { id: 1, title: "泥土の隠者", monsterName: "ドロドロン" },
  { id: 2, title: "彷徨える雪鬼獣", monsterName: "ユキオニ" },
  { id: 3, title: "轟く声", monsterName: "ゴウゴウザウルス" },
  { id: 4, title: "ねじれた欲望", monsterName: "ネジレッド" },
  { id: 5, title: "大社跡での肝試し", monsterName: "ヒミツノヨウカイ" },
];

const monsterImage = "/images/monsters/encyclopedias/monster_question_mark.jpg";

const GameContainer = styled.div`
  background-image: url('/images/layouts/basic_background.jpg');
  background-repeat: repeat;
  background-size: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const QuestBoard = styled.div`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #C0C0C0;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
`;

const QuestItem = styled.li<{ isSelected: boolean }>`
  background-color: ${props => props.isSelected ? "#3B82F6" : "#1E3A8A"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3B82F6;
    transform: scale(1.05);
  }
`;

const QuestDetailContainer = styled.div`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #C0C0C0;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
`;

export default function QuestPage() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(quests[0]);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

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
    <GameContainer>
      {showSuccessMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
      <div className="w-full max-w-6xl pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuestBoard className="md:col-span-1">
            <h6 className="text-center text-2xl font-bold mb-6">
              クエスト掲示板
            </h6>
            <ul>
              {quests.map((quest) => (
                <QuestItem
                  key={quest.id}
                  onClick={() => handleQuestClick(quest)}
                  isSelected={selectedQuest?.id === quest.id}
                >
                  {quest.title} - {quest.monsterName}
                </QuestItem>
              ))}
            </ul>
          </QuestBoard>

          {!isMobile && selectedQuest && (
            <QuestDetailContainer className="md:col-span-2">
              <h6 className="text-2xl font-bold mb-6">
                {selectedQuest.title}
              </h6>
              <Image
                src={monsterImage}
                alt={selectedQuest.monsterName}
                width={250}
                height={250}
                className="mb-6 border-4 border-gray-300 rounded-lg"
              />
              <p className="text-center mb-6 text-xl">
                {`目標: ${selectedQuest.monsterName} 1頭の狩猟`}
              </p>
              <Link href={`/quests/${selectedQuest.id}/battleStart`}>
                <BasicButton text="クエスト出発" />
              </Link>
            </QuestDetailContainer>
          )}
        </div>
      </div>

      {isMobile && open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              backgroundColor: 'rgba(30, 58, 138, 0.9)',
              border: '3px solid #C0C0C0',
              borderRadius: '15px',
              color: '#fff',
            },
          }}
        >
          <DialogTitle>
            {selectedQuest?.title}
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="text-center">
            <Image
              src={monsterImage}
              alt={selectedQuest?.monsterName || "モンスター"}
              width={200}
              height={200}
              className="mb-6 mx-auto border-4 border-gray-300 rounded-lg"
            />
            <p className="mb-6 text-xl">
              {selectedQuest && `目標: ${selectedQuest.monsterName} 1頭の狩猟`}
            </p>
            <Link href={`/quests/${selectedQuest?.id}/battleStart`}>
              <BasicButton text="クエスト出発" />
            </Link>
          </DialogContent>
        </Dialog>
      )}
    </GameContainer>
  );
}
