export interface Quest {
  id: number;
  title: string;
  monster_id: number;
  monsterName: string;
}

export interface Monster {
  id: number;
  name: string;
  bestiary_monster_image_url: string;
  start_battle_image_url: string;
  end_battle_image_url: string;
}

export interface UserData {
  name: string;
  gender: string;
  hunterRank: number;
}

export interface GuildCard {
  defeat_count: number;
  monster: Monster;
}

export interface AuthContextType {
  token: string | null;
  googleUserId: string | null;
  currentUser: any;
  setToken: (token: string) => void;
  logout: () => void;
}

export interface JwtPayload {
  google_user_id: string;
  exp: number;
}

export interface QuestBoardProps {
  quests: Quest[];
  onQuestClick: (questId: number) => void;
  isMobile: boolean;
}

export interface QuestDetailProps {
  questId: number;
  quest: Quest | undefined;
  monster: Monster | undefined;
}

export interface QuestItemProps {
  quest: Quest;
  isSelected: boolean;
  onClick: () => void;
}

export interface MobileDialogProps {
  open: boolean;
  onClose: () => void;
  questId: number;
  quest: Quest | undefined;
  monster: Monster | undefined;
}
