'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BasicButton } from '@/components/layouts';
import { WarningMessage } from '@/components/layouts/messages';
import Image from 'next/image';

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
        <div className="absolute left-1/2 top-10 z-10 w-full max-w-[90%] -translate-x-1/2 text-4xl font-bold text-white sm:max-w-[78%]">
          <p className="mt-20 rounded-md bg-black/40 px-8 py-4 text-left text-xl sm:mb-2 sm:mt-44 sm:text-2xl md:mt-60 md:text-4xl">
            日常の掃除を「狩」に変える！クエストに挑戦し、モンスターを討伐しよう！
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
