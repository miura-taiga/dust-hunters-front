import Image from 'next/image';
import { AuthLayoutProps } from '@/types';

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative">
      <Image
        src="/images/layouts/basic_background.jpg"
        alt="Basic Background Image"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
