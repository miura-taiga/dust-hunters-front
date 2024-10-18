import Image from 'next/image';
import { Headers, Footers } from '@/components/layouts';
import { GeneralLayoutProps } from '@/types';

export default function GeneralLayout({ children }: GeneralLayoutProps) {
  return (
    <div>
      <Image
        src="/images/layouts/top_page_background_image.jpg"
        alt="Dust Hunters Background"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
      />
      <Headers />
      <main>{children}</main>
      <Footers />
    </div>
  );
}
