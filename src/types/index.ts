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
}
