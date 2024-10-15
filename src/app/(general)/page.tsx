'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BasicButton } from '@/components/layouts';
import { WarningMessage } from '@/components/layouts/messages';

const TopPage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const flash = searchParams.get('flash');
    const message = searchParams.get('message');

    if (flash === 'warning' && message) {
      setMessage(message);
      setShowMessage(true);
    }
  }, []);

  return (
    <article>
      <div className="relative flex min-h-screen flex-col justify-center text-white">
        {showMessage && (
          <WarningMessage
            message={message}
            onClose={() => setShowMessage(false)}
          />
        )}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/layouts/top_page_background_image.jpg"
            alt="Dust Hunters Background"
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <p className="mt-72 rounded-md bg-black/50 p-4 text-xl sm:mt-80 sm:text-2xl md:text-3xl">
            日常の掃除を冒険に変える！クエストに挑戦し、モンスターを討伐しよう！
          </p>
        </div>
        <div className="relative z-10 mb-60 mt-auto flex items-center justify-center sm:mb-60">
          <Link href="/quests">
            <BasicButton text="ひと狩り行こうぜ" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TopPage;
