'use client';

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import { useApp } from '@/context/AppContext';

export default function HeroVideo({ onWatched }) {
  const app = useApp();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const video = app.videos[currentLocale];

  const player = useRef();
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className="flex w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
      {hasWindow ? (
        <ReactPlayer
          ref={player}
          url={video}
          controls
          width="100%"
          height="auto"
          className="max-w-screen-xl mx-auto"
          onProgress={({ playedSeconds }) => {
            const duration = player?.current?.getDuration() || 1;
            if (playedSeconds / duration > 0.9) {
              onWatched()
            }
          }}
        />
      ) : null}
    </div>
  );
}
