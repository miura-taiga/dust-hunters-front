import { Headers, Footers } from '@/components/layouts';
import { GeneralLayoutProps } from '@/types';

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <div>
      <Headers />
      <main>{children}</main>
      <Footers />
    </div>
  );
}
