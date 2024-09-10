"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { BasicButton, Loading } from "@/components/layouts";
import useFetchData from "@/lib/useFetchData";
import { Settings } from "@/config";

interface QuestDetailProps {
  questId: number;
}

interface Quest {
  id: number;
  title: string;
  monster_id: number;
}

interface Monster {
  id: number;
  name: string;
  bestiary_monster_image_url: string;
}

const QuestDetailContainer = styled.div`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  width: 100%;
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

const MonsterImage = styled(Image)`
  margin-bottom: 20px;
`;

const MonsterName = styled.p`
  text-align: center;
  font-size: 1.25rem;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const QuestDetail: React.FC<QuestDetailProps> = ({ questId }) => {
  const quest = useFetchData<Quest>(`${Settings.API_URL}/api/v1/quests/${questId}`);
  const monster = useFetchData<Monster>(
    quest ? `${Settings.API_URL}/api/v1/monsters/${questId}` : ""
  );

  if (!quest || !monster) {
    return <Loading />;
  }

  return (
    <QuestDetailContainer>
      <TitleContainer>
        <Title>{quest.title}</Title>
      </TitleContainer>
      <MonsterImage
        src={monster.bestiary_monster_image_url}
        alt={monster.name}
        width={250}
        height={250}
        className="border-4 border-gray-300 rounded-lg"
      />
      <MonsterName>{monster.name} 1頭の狩猟</MonsterName>
      <ButtonContainer>
        <Link href={`/quests/${quest.id}/battleStart`}>
          <BasicButton text="クエスト出発" />
        </Link>
      </ButtonContainer>
    </QuestDetailContainer>
  );
};

export default QuestDetail;
