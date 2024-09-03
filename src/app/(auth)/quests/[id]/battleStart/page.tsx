interface Quest {
  id: number;
  title: string;
}

const quests: Quest[] = [{ id: 1, title: "テストタイトル" }];

export default function BattleStartPage() {
  return <article>戦闘開始ページページ</article>;
}
