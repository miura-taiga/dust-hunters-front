"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Link from "next/link";
import { BasicButton, Loading } from "@/components/layouts";
import styled from "@emotion/styled";
import { MobileDialogProps } from "@/types";

const StyledDialogTitle = styled(DialogTitle)`
  position: relative;
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledMonsterName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
`;

const MobileDialog: React.FC<MobileDialogProps> = ({
  open,
  onClose,
  quest,
  monster,
}) => {
  if (!quest || !monster) {
    return <Loading />;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "rgba(30, 58, 138, 0.9)",
          color: "#fff",
          borderRadius: "15px",
          padding: "20px",
        },
      }}
    >
      <StyledDialogTitle>
        {quest.title}
        <CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent dividers>
        <Image
          src={monster.bestiary_monster_image_url}
          alt={monster.name}
          width={200}
          height={200}
          style={{
            margin: "0 auto",
            borderRadius: "8px",
            border: "4px solid #ccc",
          }}
        />
        <StyledMonsterName>{monster.name} 1頭の狩猟</StyledMonsterName>

        <Link href={`/quests/${quest.id}/battleStart`}>
          <BasicButton text="クエスト出発" />
        </Link>
      </StyledDialogContent>
    </Dialog>
  );
};

export default MobileDialog;
