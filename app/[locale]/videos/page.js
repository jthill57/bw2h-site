'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

import { VIDEOS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

export default function Videos() {
  const app = useApp();
  const { t } = useTranslation();
  const { recommendedVideos } = app;

  return (
    <div className="flex flex-col w-full gap-6 py-8 flex-1">
      {recommendedVideos.length ? (
        <div className="w-full max-w-screen-xl mx-auto px-8 flex flex-col gap-6">
          <h1 className="text-xl font-semibold text-gray-800 flex flex-col lg:flex-row lg:items-baseline lg:gap-2">
            {t('recommended_videos')} <span className="text-sm font-normal text-gray-500">({t('english_only')})</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {recommendedVideos.map((videoID) => {
              const video = VIDEOS[videoID];

              return (
                <Link
                  key={videoID}
                  className="flex flex-col gap-4 rounded-2xl bg-slate-100 overflow-hidden"
                  href={`/videos/${videoID}`}
                >
                  <div className="overflow-hidden bg-white">
                    <Image
                      src={video.thumbnail || '/images/bw2h_logo_simple.png'}
                      alt={`${video.title} thumbnail`}
                      className={`object-cover object-center h-36 lg:h-48 ${!video.thumbnail ? 'opacity-40' : ''}`}
                      width={700}
                      height={400}
                    />
                  </div>
                  <div className="flex flex-col p-6 pt-0 flex-1">
                    <h3 className="text-base text-gray-800 font-semibold">{video.title}</h3>
                    <h4 className="text-sm text-gray-600">{video.type}</h4>
                    <p className="pt-2">{video.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
