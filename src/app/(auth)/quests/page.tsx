"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameContainerWrapper, QuestBoard, QuestDetail, MobileDialog } from '@/features/quests';
import { SuccessMessage } from '@/components/layouts/messages';

interface Quest {
  id: number;
  title: string;
  monsterName: string;
}

const quests: Quest[] = [
  { id: 1, title: '泥土の隠者', monsterName: 'ドロドロン' },
  { id: 2, title: '彷徨える雪鬼獣', monsterName: 'ユキオニ' },
  { id: 3, title: '轟く声', monsterName: 'ゴウゴウザウルス' },
  { id: 4, title: 'ねじれた欲望', monsterName: 'ネジレッド' },
  { id: 5, title: '大社跡での肝試し', monsterName: 'ヒミツノヨウカイ' },
];

const monsterImage = '/images/monsters/encyclopedias/monster_question_mark.jpg';

export default function QuestPage() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(quests[0]);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setSuccessMessage('ログインしました！');
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
    <GameContainerWrapper>
      {showSuccessMessage && (
        <SuccessMessage message={successMessage} onClose={() => setShowSuccessMessage(false)} />
      )}
      <div className="w-full max-w-6xl pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <QuestBoard
            quests={quests}
            selectedQuestId={selectedQuest?.id || null}
            onQuestClick={handleQuestClick}
          />

          {!isMobile && selectedQuest && (
            <QuestDetail quest={selectedQuest} monsterImage={monsterImage} />
          )}
        </div>
      </div>

      {isMobile && selectedQuest && (
        <MobileDialog
          open={open}
          onClose={() => setOpen(false)}
          quest={selectedQuest}
          monsterImage={monsterImage}
        />
      )}
    </GameContainerWrapper>
  );
}
