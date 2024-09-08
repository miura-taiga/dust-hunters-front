"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { SuccessMessage, ErrorMessage } from "@/components/layouts/messages";
import { useAuth } from "@/contexts/auth";
import { Settings } from "@/config";
import { UserUid } from "@/hooks/userUid";
import { Progress } from "@/components/layouts";
import styled from "@emotion/styled";

interface UserData {
  name: string;
  gender: string;
  errors?: string[];
}

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

const StyledCard = styled(Card)`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  color: white;
`;

const textFieldColor = "#1E3A8A";
const fieldHighlightColor = "rgba(30, 58, 138, 0.8)";

const textFieldSx = {
  input: {
    color: "white",
    backgroundColor: fieldHighlightColor,
    borderRadius: "4px",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: textFieldColor,
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",
    },
  },
  "& input": {
    backgroundColor: "transparent",
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 100px ${fieldHighlightColor} inset`,
      WebkitTextFillColor: "white", 
    },
  },
};

const genderOptions: { [key: string]: string } = {
  男性: "male",
  女性: "female",
  その他: "other",
};

export default function UserProfile() {
  const uid = UserUid();
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (token && uid) {
      (async () => {
        try {
          const response = await fetch(`${Settings.API_URL}/api/v1/users/${uid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data: UserData = await response.json();
            setUserData(data);
          } else {
            const errorData = await response.json();
            alert(`データ取得に失敗しました: ${errorData.errors?.join(", ") || "不明なエラー"}`);
          }
        } catch (error) {
          alert("データ取得中にエラーが発生しました。");
        }
      })();
    }
  }, [token, uid]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setGender(
        Object.keys(genderOptions).find(
          (key) => genderOptions[key] === userData.gender
        ) || ""
      );
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "gender") setGender(value);
  };

  const handleSubmit = async () => {
    const genderInEnglish = genderOptions[gender as keyof typeof genderOptions];
    try {
      const response = await fetch(`${Settings.API_URL}/api/v1/users/${uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: { name, gender: genderInEnglish } }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      alert("プロフィール編集に失敗しました");
    }
  };

  if (!userData) return <Progress />;

  return (
    <GameContainer>
      {showSuccessMessage && (
        <SuccessMessage
          message="プロフィールが保存されました！"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      {showErrorMessage && (
        <ErrorMessage
          message="名前は1〜10文字以内で入力してください"
          onClose={() => setShowErrorMessage(false)}
        />
      )}

      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 3 }}>
        <StyledCard>
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ marginBottom: "24px" }}
            >
              プロフィール
            </Typography>
            <Stack spacing={2}>
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
                        color: "white",
                      },
                    },
                  },
                }}
                sx={{
                  ...textFieldSx,
                  "& .MuiSelect-select": {
                    color: "white",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {Object.keys(genderOptions).map((option) => (
                  <MenuItem key={option} value={option} sx={{ color: "white" }}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleSubmit}
              >
                保存
              </Button>
            </Stack>
          </CardContent>
        </StyledCard>
      </Box>
    </GameContainer>
  );
}
