'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, Typography, Box } from '@mui/material';
import { UserUid } from '@/hooks/userUid';
import useFetchData from '@/lib/useFetchData';
import { Loading } from '@/components/layouts';
import styled from '@emotion/styled';
import { Settings } from '@/config';
import { Monster, GuildCard } from '@/types';

const defaultImage = '/images/monsters/encyclopedias/monster_question_mark.jpg';

const StyledCard = styled(Card)`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  color: white;
`;

export default function MonsterEncyclopedia() {
  const uid = UserUid();
  const [guildCards, setGuildCards] = useState<GuildCard[]>([]);

  const monstersData = useFetchData(
    uid ? `${Settings.API_URL}/api/v1/guild_cards/${uid}` : '',
  );

  useEffect(() => {
    if (Array.isArray(monstersData)) {
      const formattedGuildCards = monstersData.map((data: any) => ({
        defeat_count: data.defeat_count,
        monster: {
          id: data.monster_id,
          name: data.monster_name,
          bestiary_monster_image_url: data.bestiary_monster_image_url,
        } as Monster,
      }));

      setGuildCards(formattedGuildCards);
    }
  }, [monstersData]);

  if (!monstersData) return <Loading />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/images/layouts/basic_background.jpg')] bg-repeat bg-auto">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold z-10">
        <p className="text-2xl sm:text-2xl md:text-5xl bg-black bg-opacity-50 p-4 rounded-md mt-2 sm:mb-2">
          モンスター図鑑
        </p>
      </div>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          padding: '16px',
          color: 'white',
          paddingBottom: '80px',
        }}
      >
        <Grid container spacing={8} sx={{ marginTop: '76px' }}>
          {guildCards.map((guildCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={guildCard.monster.id}>
              <StyledCard className="text-white h-full max-w-[300px] mx-auto border-4 border-gray-300 rounded-xl shadow-lg p-4">
                <Typography
                  variant="h6"
                  component="div"
                  className="text-center text-lg font-bold mb-2"
                >
                  {guildCard.monster.name}
                </Typography>
                <div className="border-b border-white w-full mb-4" />
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    guildCard.defeat_count >= 1
                      ? guildCard.monster.bestiary_monster_image_url
                      : defaultImage
                  }
                  alt={guildCard.monster.name}
                  className="rounded-xl mx-auto mb-4 border-2 border-gray-300"
                  style={{
                    width: '100%',
                    maxWidth: '220px',
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="body2"
                  className="text-white text-center mb-2"
                  fontSize={'20px'}
                >
                  討伐数: {guildCard.defeat_count}
                </Typography>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
