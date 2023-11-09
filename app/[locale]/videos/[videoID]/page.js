import HeroVideo from '@/components/HeroVideo';
import { VIDEOS } from '@/lib/constants';

export default async function Video({ params: { videoID } }) {
  const video = VIDEOS[videoID];
  if (!video) return null;

  return (
    <>
      <HeroVideo videoId={videoID} />
      <div className="flex flex-col w-full gap-8 py-8">
        <div className="w-full bg-slate-100 py-8 flex items-center -mt-8">
          <div className="px-8 max-w-screen-xl flex w-full items-center justify-between flex-col gap-8 lg:flex-row mx-auto">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {video.title}
              </h2>
              <h3 className="text-base text-gray-600">
                {video.description}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
