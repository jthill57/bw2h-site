'use client';

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import { useApp } from '@/context/AppContext';
import { VIDEOS } from '@/lib/constants';

export default function HeroVideo({ onWatched, videoId }) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const app = useApp();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const video = app.videos[currentLocale];
  const customVideo = VIDEOS[videoId];

  const player = useRef();
  const [hasWindow, setHasWindow] = useState(false);
  const [logged90, log90] = useState(false);
  const [loggedPlayTrack, logPlayTrack] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className={`flex w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 ${customVideo ? 'min-h-[30vh]' : ''}`}>
      {hasWindow ? (
        <ReactPlayer
          ref={player}
          url={customVideo ? customVideo.src : video}
          light={customVideo ? customVideo.thumbnail : false}
          controls
          width="100%"
          height="auto"
          className="max-w-screen-xl mx-auto"
          playsinline
          onProgress={({ playedSeconds }) => {
            const duration = player?.current?.getDuration() || 1;
            if (playedSeconds / duration > 0.9) {
              onWatched && onWatched();
              if (!logged90) {
                onWatched && window.umami && window.umami(`Watched 90% in ${currentLocale}`);
                log90(true);
              }
            }
          }}
          onPlay={() => {
            if (!loggedPlayTrack) {
              logPlayTrack(true);
              window.umami && window.umami(`Started Watching in ${currentLocale}`);
            }
          }}
          onEnded={() => window.umami && window.umami(`Finished Watching in ${currentLocale}`)}
          config={{
            file: {
              forceSafariHLS: !isSafari,
              forceVideo: true,
              // in iOS env: hls options is not working
              hlsOptions: {
                xhrSetup: function (xhr, url) {
                  xhr.setRequestHeader('token', 'admin');
                },
              },
            },
          }}
        />
      ) : null}
    </div>
  );
}
