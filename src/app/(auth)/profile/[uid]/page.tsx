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
import { SuccessMessage } from "@/components/layouts";
import { useAuth } from "@/contexts/auth";
import { Settings } from "@/config";
import { UserUid } from "@/hooks/userUid";

interface UserData {
  name: string;
  gender: string;
  errors?: string[];
}

const textFieldSx = {
  input: { color: "white" },
  "& .MuiInputLabel-root": { color: "white" },
  "& input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #374151 inset",
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
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (token && uid) {
      (async () => {
        try {
          const response = await fetch(`${Settings.API_URL}/api/v1/users/${uid}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
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
      setGender(Object.keys(genderOptions).find(
        (key) => genderOptions[key] === userData.gender
      ) || '');
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user: { name, gender: genderInEnglish } }),
      });

      if (response.ok) {
        setShowSuccessMessage(true);
      } else {
        const errorData = await response.json();
        alert(errorData.errors?.join(", ") || "エラーが発生しました。");
      }
    } catch (error) {
      alert("エラーが発生しました。");
    }
  };

  if (!userData) return <div>読み込み中...</div>;

  return (
    <div className="relative min-h-screen bg-[url('/images/layouts/basic_background.jpg')] bg-repeat bg-auto flex justify-center items-center">
      {showSuccessMessage && (
        <SuccessMessage
          message="プロフィールが保存されました！"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 3 }}>
        <Card sx={{ backgroundColor: "#374151", color: "white" }}>
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
                        backgroundColor: "#374151",
                        color: "white",
                      },
                    },
                  },
                }}
                sx={{
                  ...textFieldSx,
                  "& .MuiSelect-select": {
                    color: "white",
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
        </Card>
      </Box>
    </div>
  );
}
