'use client'

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Transition } from '@headlessui/react';
import {
  UserIcon,
  BookOpenIcon,
  MegaphoneIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

import HeroVideo from '@/components/HeroVideo';
import { useApp } from '@/context/AppContext';

const products = [
  // { name: 'Find a church', description: 'Get into a church that preaches from the King James Bible and has the right gospel', href: '#', icon: MagnifyingGlassIcon },
  { name: 'Come to church', description: 'Come and visit our church where you will be edified by the entire Bible', href: '#', icon: HomeIcon },
  { name: 'Be baptized', description: 'The first step in obedience after you get saved to profess your faith and begin your walk with God', href: '#', icon: UserIcon },
  { name: 'Get the right Bible', description: 'Find a KJV Bible that you can read, as modern versions pervert and tamper with the Word of God', href: '#', icon: BookOpenIcon },
  { name: 'Spread the gospel', description: 'Learn how to go soul winning and reach the lost with the gospel of Jesus Christ', href: '#', icon: MegaphoneIcon },
];

function ActionButtons() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:justify-end">
      <button type="button" class="whitespace-nowrap text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg w-full lg:w-auto px-8 py-4 text-center">
        {t('action_buttons.yes')}
      </button>
      <button type="button" class="whitespace-nowrap text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg w-full lg:w-auto px-8 py-4 text-center">
        {t('action_buttons.no')}
      </button>
    </div>
  );
}

export default function LandingPage() {
  const app = useApp();
  const { t } = useTranslation();
  const [isShowingActionButtons, setIsShowingActionButtons] = useState(false);

  const { recommendedVideos } = app;

  return (
    <>
      <HeroVideo onWatched={() => setIsShowingActionButtons(true)} />
      <div className="flex flex-col w-full gap-8 py-8">
        <div className="w-full bg-slate-100 py-8 flex items-center -mt-8">
          <div className="px-8 max-w-screen-xl flex w-full items-center justify-between flex-col gap-8 lg:flex-row mx-auto">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {t('main_question')}
              </h2>
              <h3 className="text-base text-gray-600">
                {t('watch_video')}
              </h3>
            </div>
            <Transition
              appear
              show={isShowingActionButtons}
              enter="transition-opacity duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-1000"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="flex-1 w-full"
            >
              <ActionButtons />
            </Transition>
          </div>
        </div>
        {recommendedVideos.length ? (
          <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col gap-6">
            <h1 className="text-xl font-semibold text-gray-800 flex flex-col lg:flex-row lg:items-baseline lg:gap-2">
              {t('recommended_videos')} <span className="text-sm font-normal text-gray-500">({t('english_only')})</span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
              {recommendedVideos.map((video) => (
                <div key={video.title} className="flex flex-col gap-4 rounded-2xl bg-slate-100 overflow-hidden">
                  <div className="overflow-hidden bg-gray-200">
                    <Image
                      src={video.thumbnail || '/images/bw2h_logo_simple.png'}
                      alt={`${video.title} thumbnail`}
                      className={`object-cover object-center h-36 lg:h-48 ${!video.thumbnail ? 'opacity-40' : ''}`}
                      width={700}
                      height={400}
                    />
                  </div>
                  <div className="flex flex-col p-4 pt-0 flex-1">
                    <h3 className="text-base text-gray-800 font-semibold">{video.title}</h3>
                    <h4 className="text-sm text-gray-600">{video.type}</h4>
                    <p className="pt-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

{/* <div className="py-4 hidden">
  {products.map((item) => (
    <div
      key={item.name}
      className="group relative flex items-center gap-x-6 rounded-lg py-4 text-sm leading-6 hover:bg-gray-100"
    >
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
      </div>
      <div className="flex-auto">
        <a href={item.href} className="block font-semibold text-gray-900">
          {item.name}
          <span className="absolute inset-0" />
        </a>
        <p className="mt-1 text-gray-600">{item.description}</p>
      </div>
    </div>
  ))}
</div> */}
