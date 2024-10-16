// import { GuildCardsTab } from '@/components/layouts';
import { GuildCardsLayoutProps } from '@/types';

export default function GeneralLayout({ children }: GuildCardsLayoutProps) {
  return (
    <div>
      {/* 本番環境に影響を及ばさないように活動履歴、掃除場所の実装が出来次第、表示 */}
      {/* <GuildCardsTab /> */}
      <main>{children}</main>
    </div>
  );
}
