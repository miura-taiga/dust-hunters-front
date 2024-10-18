import { GuildCardsTab } from '@/components/layouts';
import { GuildCardsLayoutProps } from '@/types';

export default function GeneralLayout({ children }: GuildCardsLayoutProps) {
  return (
    <div>
      <GuildCardsTab />
      <main>{children}</main>
    </div>
  );
}
