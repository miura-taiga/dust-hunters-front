import { ReactNode } from 'react';
import { Headers, Footers } from '@/components/layouts';

interface GeneralLayoutProps {
  children: ReactNode;
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <div>
      <Headers />
      <main>{children}</main>
      <Footers />
    </div>
  );
}
