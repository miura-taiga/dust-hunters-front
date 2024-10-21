import Image from 'next/image';
import { Footers, Headers } from '@/components/layouts';
import { CommonLayoutProps } from '@/types';

export default function CommonLayout({ children }: CommonLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Headers />
      <main className="relative z-10">{children}</main>

      <div className="relative grow">
        <div className="relative h-[calc(100vh-150px)] w-full">
          <Image
            src="/images/layouts/basic_background.jpg"
            alt="Basic Background Image"
            fill
            style={{ objectFit: 'cover' }}
            className="absolute left-0 top-0 -z-10 size-full"
          />
        </div>
      </div>
      <Footers />
    </div>
  );
}
