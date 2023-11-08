'use client';

import { LanguageSelector } from './LanguageSelector';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';

// const products = [
//   // { name: 'Find a church', description: 'Get into a church that preaches from the King James Bible and has the right gospel', href: '#', icon: MagnifyingGlassIcon },
//   { name: 'Come to church', description: 'Come and visit our church where you will be edified by the entire Bible', href: '#', icon: HomeIcon },
//   { name: 'Be baptized', description: 'The first step in obedience after you get saved to profess your faith and begin your walk with God', href: '#', icon: UserIcon },
//   { name: 'Get the right Bible', description: 'Find a KJV Bible that you can read, as modern versions pervert and tamper with the Word of God', href: '#', icon: BookOpenIcon },
//   { name: 'Spread the gospel', description: 'Learn how to go soul winning and reach the lost with the gospel of Jesus Christ', href: '#', icon: MegaphoneIcon },
// ]
// const callsToAction = [
//   { name: 'Share this site', href: '#', icon: ShareIcon },
//   { name: 'Contact us', href: '#', icon: EnvelopeIcon },
// ]

export default function Header({ languages }) {
  const app = useApp();

  return (
    <>
      <header className="bg-white w-full">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="flex gap-4 items-center">
              <span className="sr-only">Bible Way to Heaven</span>
              <Image
                src={app.logo.url}
                width={app.logo.width}
                height={app.logo.height}
                alt="Logo"
              />
              <h1 className={`font-semibold text-gray-700 text-lg ${!app.showName ? 'sr-only' : null}`}>{app.name}</h1>
              {/* <span className="font-semibold text-gray-700">Sure Foundation Baptist Church</span> */}
            </a>
          </div>
          <div className="flex lg:flex-1 lg:justify-end">
            <LanguageSelector languages={languages} />
          </div>
        </nav>
      </header>
    </>
  );
}
