'use client';

import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Loading } from '@/components/layouts';
import { QuestItem } from '@/features/quests';
import { Quest, QuestBoardProps } from '@/types';

const QuestBoardContainer = styled.div`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
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

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onQuestClick }) => {
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null);

  if (!quests) {
    return <Loading />;
  }

  const handleQuestClick = (quest: Quest) => {
    setSelectedQuestId(quest.id);
    onQuestClick(quest.id);
  };

  return (
    <QuestBoardContainer>
      <TitleContainer>
        <Title>クエスト掲示板</Title>
      </TitleContainer>
      <List>
        {quests.map((quest) => (
          <ListItem key={quest.id}>
            <QuestItem
              quest={quest}
              isSelected={selectedQuestId === quest.id}
              onClick={() => handleQuestClick(quest)}
            />
          </ListItem>
        ))}
      </List>
    </QuestBoardContainer>
  );
};

export default QuestBoard;
