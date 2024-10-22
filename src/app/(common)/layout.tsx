import Image from 'next/image';
import { Footers, Headers } from '@/components/layouts';
import { CommonLayoutProps } from '@/types';

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Image
        src="/images/layouts/basic_background.jpg"
        alt="Basic Background Image"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute left-0 top-0 -z-10 w-full h-full"
      />
      <Headers />
      <main className="relative z-10 grow">{children}</main>
      <Footers />
    </div>
  );
}
