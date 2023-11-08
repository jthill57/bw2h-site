'use client'

import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

export default function HeroVideo({ onWatched }) {
  const player = useRef()
  const [hasWindow, setHasWindow] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

  return (
    <div className="flex w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
      {hasWindow ? (
        <ReactPlayer url='https://www.kjv1611only.com/video/01salvation/Pastor_Berzins.mp4'
          ref={player}
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
