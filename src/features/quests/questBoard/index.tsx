import React from 'react';
import styled from '@emotion/styled';
import { QuestItem } from "@/features/quests";

interface Quest {
  id: number;
  title: string;
  monsterName: string;
}

interface QuestBoardProps {
  quests: Quest[];
  selectedQuestId: number | null;
  onQuestClick: (quest: Quest) => void;
}

const QuestBoardContainer = styled.div`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #C0C0C0;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
`;

const TitleContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h6`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 10px;
`;

const QuestBoard: React.FC<QuestBoardProps> = ({ quests, selectedQuestId, onQuestClick }) => {
  return (
    <QuestBoardContainer>
      <TitleContainer>
        <Title>クエスト掲示板</Title>
      </TitleContainer>
      <ul>
        {quests.map((quest) => (
          <QuestItem
            key={quest.id}
            quest={quest}
            isSelected={selectedQuestId === quest.id}
            onClick={() => onQuestClick(quest)}
          />
        ))}
      </ul>
    </QuestBoardContainer>
  );
};

export default QuestBoard;
