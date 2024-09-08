import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import { BasicButton } from '@/components/layouts';
import styled from '@emotion/styled';

interface MobileDialogProps {
  open: boolean;
  onClose: () => void;
  quest: {
    id: number;
    title: string;
    monsterName: string;
  };
  monsterImage: string;
}

const StyledDialogTitle = styled(DialogTitle)`
  border-bottom: 2px solid #ffffff;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const StyledMonsterName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const MobileDialog: React.FC<MobileDialogProps> = ({ open, onClose, quest, monsterImage }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: 'rgba(30, 58, 138, 0.9)',
          color: '#fff',
          borderRadius: '15px',
          padding: '20px',
        },
      }}
    >
      <StyledDialogTitle>
        {quest.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent dividers className="text-center">
        <Image
          src={monsterImage}
          alt={quest.monsterName}
          width={200}
          height={200}
          className="mb-6 mx-auto border-4 border-gray-300 rounded-lg"
        />
        <StyledMonsterName>
         {quest.monsterName} 1頭の狩猟k
        </StyledMonsterName>
        <Link href={`/quests/${quest.id}/battleStart`}>
          <BasicButton text="クエスト出発" />
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default MobileDialog;
