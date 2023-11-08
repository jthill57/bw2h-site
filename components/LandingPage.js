'use client'

import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { Transition, Dialog } from '@headlessui/react';
import {
  UserIcon,
  BookOpenIcon,
  MegaphoneIcon,
  HomeIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
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

function ActionButtons({ handleAction }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:justify-end">
      <button
        type="button"
        class="whitespace-nowrap text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-lg w-full lg:w-auto px-8 py-4 text-center"
        onClick={() => handleAction(true)}
      >
        {t('action_buttons.yes')}
      </button>
      <button
        type="button"
        class="whitespace-nowrap text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg w-full lg:w-auto px-8 py-4 text-center"
        onClick={() => handleAction(false)}
      >
        {t('action_buttons.no')}
      </button>
    </div>
  );
}

function ContactModal({ isOpen, closeModal, gotSaved }) {
  const { t } = useTranslation();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md max-h-[calc(100vh-120px)] overflow-auto transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  {gotSaved ? t('action_modal.saved_title') : t('action_modal.questions_title')}
                  <button onClick={closeModal}>
                    <XMarkIcon className="h-6" />
                  </button>
                </Dialog.Title>
                {gotSaved ? (
                  <p className="mt-6 text-sm">
                    {t('action_modal.saved_text_start')}
                    <ol className="my-4 space-y-2">
                      <li>
                        <span className="flex items-center gap-1">
                          <a href="#" className="text-sky-700 ">{t('action_modal.find_church')}</a>
                          <ArrowTopRightOnSquareIcon className="h-4" />
                        </span>
                      </li>
                      <li>
                        <span className="flex items-center gap-1">
                          <a href="#" className="text-sky-700 ">{t('action_modal.get_baptized')}</a>
                          <ArrowTopRightOnSquareIcon className="h-4 " />
                        </span>
                      </li>
                      <li>
                        <span className="flex items-center gap-1">
                          <a href="#" className="text-sky-700 ">{t('action_modal.get_bible')}</a>
                          <ArrowTopRightOnSquareIcon className="h-4" />
                        </span>
                      </li>
                      <li>
                        <span className="flex items-center gap-1">
                          <a href="#" className="text-sky-700 ">{t('action_modal.spread_gospel')}</a>
                          <ArrowTopRightOnSquareIcon className="h-4" />
                        </span>
                      </li>
                    </ol>
                    {t('action_modal.saved_text_end')}
                  </p>
                ) : (
                  <p className="mt-6 text-sm">
                    {t('action_modal.questions_text')}
                  </p>
                )}
                <div className="mt-6">
                  <form action="#" class="space-y-6">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('action_modal.email')}</label>
                        <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@domain.com" required />
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('action_modal.message')}</label>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={t('action_modal.message_placeholder')}></textarea>
                    </div>
                    <button
                      type="button"
                      className="whitespace-nowrap text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-full lg:w-auto px-8 py-4 text-center"
                      onClick={closeModal}
                    >
                      {t('action_modal.send_message')}
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function LandingPage() {
  const app = useApp();
  const { t } = useTranslation();
  const [isShowingActionButtons, setIsShowingActionButtons] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gotSaved, setGotSaved] = useState(false);

  const { recommendedVideos } = app;

  function handleAction(gotSaved) {
    setGotSaved(gotSaved);
    setIsModalOpen(true);
  }

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
              <ActionButtons handleAction={handleAction} />
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
      <ContactModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} gotSaved={gotSaved} />
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
