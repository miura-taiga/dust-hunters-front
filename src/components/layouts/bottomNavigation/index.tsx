"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        router.push("/top");
        break;
      case 1:
        router.push("/quests");
        break;
      case 2:
        router.push("/guildCards/encyclopedias");
        break;
      case 3:
        router.push("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0, 
          left: 0,
          right: 0,
          zIndex: 1000,
          bgcolor: "background.paper",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
        >
          <BottomNavigationAction label="ホーム" icon={<HomeIcon />} />
          <BottomNavigationAction label="クエスト" icon={<AssignmentIcon />} />
          <BottomNavigationAction label="図鑑" icon={<BookIcon />} />
          <BottomNavigationAction label="ユーザー" icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}