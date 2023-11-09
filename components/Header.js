'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LanguageSelector } from './LanguageSelector';
import { useApp } from '@/context/AppContext';
import { getLanguages } from '@/lib/helpers';

export default function Header() {
  const app = useApp();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const availableLanguages = await getLanguages(app.API_KEY);
      setLanguages(availableLanguages);
    };

    init();
  }, []);

  return (
    <>
      <header className="bg-white w-full sticky top-0 z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="flex gap-4 items-center">
              <span className="sr-only">Bible Way to Heaven</span>
              <Image
                src={app.logo.url}
                width={app.logo.width}
                height={app.logo.height}
                alt="Logo"
              />
              <h1 className={`font-semibold text-gray-700 text-lg ${!app.showName ? 'sr-only' : null}`}>{app.name}</h1>
              {/* <span className="font-semibold text-gray-700">Sure Foundation Baptist Church</span> */}
            </Link>
          </div>
          <div className="flex lg:flex-1 lg:justify-end">
            <LanguageSelector languages={languages} />
          </div>
        </nav>
      </header>
    </>
  );
}
