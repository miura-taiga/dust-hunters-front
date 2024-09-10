"use client";

import React, { useState, useEffect } from 'react';
import { GameContainerWrapper, QuestBoard, QuestDetail, MobileDialog } from '@/features/quests';
import { SuccessMessage } from '@/components/layouts/messages';

export default function QuestPage() {
  const [selectedQuestId, setSelectedQuestId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
  const handleQuestClick = (questId: number) => {
    setSelectedQuestId(questId);
    if (isMobile) {
      setOpen(true);
    }
  };

  return (
    <GameContainerWrapper>
      {showSuccessMessage && (
        <SuccessMessage message={successMessage} onClose={() => setShowSuccessMessage(false)} />
      )}
      <div className="w-full max-w-6xl pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <QuestBoard onQuestClick={handleQuestClick} />
          {!isMobile && (
            <QuestDetail questId={selectedQuestId} />
          )}
        </div>
      </div>

      {isMobile && (
        <MobileDialog
          open={open}
          onClose={() => setOpen(false)}
          questId={selectedQuestId}
        />
      )}
    </GameContainerWrapper>
  );
}
