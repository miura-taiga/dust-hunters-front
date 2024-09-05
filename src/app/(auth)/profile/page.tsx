"use client";

import React, { useState } from "react";
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

export default function UserProfile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    setShowSuccessMessage(true);
  };

  const handleCloseMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div className="relative min-h-screen bg-[url('/images/layouts/basic_background.jpg')] bg-repeat bg-auto flex justify-center items-center">
      {showSuccessMessage && (
        <SuccessMessage
          message="プロフィールが保存されました！"
          onClose={handleCloseMessage}
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
                label="名前"
                variant="outlined"
                value={name}
                onChange={handleInputChange(setName)}
                sx={textFieldSx}
              />
              <TextField
                select
                fullWidth
                label="性別"
                variant="outlined"
                value={gender}
                onChange={handleInputChange(setGender)}
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
                {["男性", "女性", "その他"].map((option) => (
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
