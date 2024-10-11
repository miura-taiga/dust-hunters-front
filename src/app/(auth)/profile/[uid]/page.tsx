'use client';

import styled from '@emotion/styled';
import {
  Box,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import { BasicButton, Loading } from '@/components/layouts';
import { SuccessMessage, ErrorMessage } from '@/components/layouts/messages';
import { Settings } from '@/config';
import { GameContainerWrapper } from '@/features/quests';
import { UserUid } from '@/hooks/userUid';
import fetcher from '@/lib/fetcher';
import useFetchData from '@/lib/useFetchData';
import { UserData } from '@/types';

const StyledCard = styled(Card)`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  color: white;
`;

const textFieldColor = '#1E3A8A';
const fieldHighlightColor = 'rgba(30, 58, 138, 0.8)';

const textFieldSx = {
  input: {
    color: 'white',
    backgroundColor: fieldHighlightColor,
    borderRadius: '4px',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    fontWeight: 'bold',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: textFieldColor,
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#3B82F6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3B82F6',
    },
  },
  '& input': {
    backgroundColor: 'transparent',
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 100px ${fieldHighlightColor} inset`,
      WebkitTextFillColor: 'white',
    },
  },
};

const genderOptions: { [key: string]: string } = {
  男性: 'male',
  女性: 'female',
  その他: 'other',
};

export default function UserProfile() {
  const uid = UserUid();
  const userData = useFetchData<UserData>(
    uid ? `${Settings.API_URL}/api/v1/users/${uid}` : '',
  );

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setGender(
        Object.keys(genderOptions).find(
          (key) => genderOptions[key] === userData.gender,
        ) || '',
      );
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'gender') setGender(value);
  };

  const handleSubmit = async () => {
    const genderInEnglish = genderOptions[gender as keyof typeof genderOptions];
    try {
      const response = await fetcher(
        `${Settings.API_URL}/api/v1/users/${uid}`,
        'PATCH',
        {
          user: { name, gender: genderInEnglish },
        },
      );

      if (response) {
        setShowSuccessMessage(true);
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  if (!userData) return <Loading />;

  return (
    <GameContainerWrapper>
      {showSuccessMessage && (
        <SuccessMessage
          message="プロフィールが保存されました！"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      <div className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-4xl font-bold text-white">
        <p className="mt-2 rounded-md bg-black/50 p-4 text-2xl sm:mb-2 sm:text-2xl md:text-5xl">
          ハンター登録
        </p>
      </div>

      {showErrorMessage && (
        <ErrorMessage
          message="名前は1〜10文字以内で入力してください"
          onClose={() => setShowErrorMessage(false)}
        />
      )}

      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 3 }}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ marginBottom: '24px' }}
            >
              プロフィール
            </Typography>

            {/* Stackに中央揃えのスタイルを追加 */}
            <Stack spacing={2} alignItems="center" justifyContent="center">
              {' '}
              {/* 中央揃えの設定 */}
              <TextField
                fullWidth
                name="name"
                label="名前"
                variant="outlined"
                value={name}
                onChange={handleInputChange}
                sx={textFieldSx}
              />
              <TextField
                select
                fullWidth
                name="gender"
                label="性別"
                variant="outlined"
                value={gender}
                onChange={handleInputChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        backgroundColor: textFieldColor,
                        color: 'white',
                      },
                    },
                  },
                }}
                sx={{
                  ...textFieldSx,
                  '& .MuiSelect-select': {
                    color: 'white',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {Object.keys(genderOptions).map((option) => (
                  <MenuItem key={option} value={option} sx={{ color: 'white' }}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <BasicButton
                text="保存"
                onClick={handleSubmit}
                sx={{
                  padding: '8px 16px',
                  fontSize: '18px',
                  minWidth: '150px',
                  maxWidth: '200px',
                  margin: '10px auto',
                  display: 'block',
                }}
              />
            </Stack>
          </CardContent>
        </StyledCard>
      </Box>
    </GameContainerWrapper>
  );
}
