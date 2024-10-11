import styled from '@emotion/styled';
import React from 'react';

interface Quest {
  id: number;
  title: string;
  monsterName: string;
}

interface QuestItemProps {
  quest: Quest;
  isSelected: boolean;
  onClick: () => void;
}

const Item = styled.li<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#3B82F6' : '#1E3A8A')};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3b82f6;
    transform: scale(1.05);
  }
`;

const QuestItem: React.FC<QuestItemProps> = ({
  quest,
  isSelected,
  onClick,
}) => {
  return (
    <Item isSelected={isSelected} onClick={onClick}>
      {quest.title}
    </Item>
  );
};

export default QuestItem;
