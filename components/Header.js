'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import { Bars3Icon, FilmIcon, MusicalNoteIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useApp } from '@/context/AppContext';
import { LanguageSelector } from './LanguageSelector';

export default function Header() {
  const app = useApp();
  const { t } = useTranslation();

  return (
    <header className="bg-white w-full sticky top-0 z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex gap-4 items-center">
            <span className="sr-only">BW2H.com</span>
            <Image
              src={app.logo.url}
              width={app.logo.width}
              height={app.logo.height}
              alt="Logo"
            />
            <div className="flex flex-col align-start -space-y-1">
              <h1 className={`font-semibold text-gray-700 text-base ${!app.showName ? 'lg:sr-only' : ''}`}>{app.name || t('bw2h')}</h1>
              {app.subName ? (
                <h2 className={`font-normal text-gray-600 text-xs ${!app.showName ? 'sr-only' : null}`}>{app.subName}</h2>
              ) : null}
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="outline-none p-2 -m-2">
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
                <Transition>
                  <Transition.Child
                    enter="transition-all duration-200"
                    enterFrom="bg-opacity-0"
                    enterTo="bg-opacity-40"
                    leave="transition-all duration-200"
                    leaveFrom="bg-opacity-40"
                    leaveTo="bg-opacity-0"
                    className="fixed top-0 left-0 right-0 bottom-0  bg-black z-30"
                  />
                  <Transition.Child
                    enter="transition-all duration-200"
                    enterFrom="left-[200vw] -right-[200vw]"
                    enterTo="left-20 right-0"
                    leave="transition-all duration-200"
                    leaveFrom="left-20 right-0"
                    leaveTo="left-[200vw] -right-[200vw]"
                    className="fixed z-40 top-0 bottom-0 overflow-auto bg-white"
                  >
                    <Popover.Panel className="flex flex-col -space-y-2
                      lg:origin-top-right lg:absolute lg:top-auto lg:bottom-auto lg:left-auto lg:right-0 lg:mt-4 lg:-mr-4 overflow-auto lg:max-h-[calc(100vh-196px)] lg:w-screen lg:max-w-[800px]">
                      {({ close }) => (
                        <>
                          <div className="p-6 pb-3 flex justify-between items-center sticky top-0 bg-white z-50">
                            <h1 className="font-semibold text-gray-700 text-base">
                              {t('more_content')} <span className="text-xs font-normal text-gray-600 ml-1">({t('english_only')})</span>
                            </h1>
                            <button onClick={() => close()}>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                          <div className="space-y-2 py-2 px-6">
                            <Link
                              href="/videos"
                              onClick={() => close()}
                              className="-mx-6 flex items-center gap-3 rounded-lg px-6 py-2 text-base font-semibold leading-7 text-sky-700 hover:bg-gray-50 outline-none"
                            >
                              <FilmIcon className="h-6" />
                              {t('videos')}
                            </Link>
                            <Link
                              href="/hymns"
                              onClick={() => close()}
                              className="-mx-6 flex items-center gap-3 rounded-lg px-6 py-2 text-base font-semibold leading-7 text-sky-700 hover:bg-gray-50 outline-none hidden"
                            >
                              <MusicalNoteIcon className="h-6" />
                              {t('hymns')}
                            </Link>
                          </div>
                        </>
                      )}
                    </Popover.Panel>
                  </Transition.Child>
                </Transition>
              </>
            )}
          </Popover>
        </div>
        <div className="hidden lg:flex flex-1 justify-end -mx-2">
          <LanguageSelector hideNameOnMobile />
        </div>
      </nav>
      {/* <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={toggleMenuOpen}>
        <Dialog.Panel className="fixed top-20 left-2 right-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 flex flex-col -space-y-2
              lg:origin-top-right lg:absolute lg:top-auto lg:bottom-auto lg:left-auto lg:right-0 lg:mt-4 lg:-mr-4 overflow-auto lg:max-h-[calc(100vh-196px)] lg:w-screen lg:max-w-[800px]">
          <div className="flow-root px-6 py-2 divide-y">
            <h1 className="mt-4 mb-4 font-semibold text-gray-800 text-base">
              {t('more_content')} <span className="text-xs font-normal text-gray-600 ml-1">({t('english_only')})</span>
            </h1>
            <div className="space-y-2 py-2">
            <Link
                href="/videos"
                onClick={() => setMobileMenuOpen(false)}
                className="-mx-6 flex items-center gap-3 rounded-lg px-6 py-2 text-base font-semibold leading-7 text-sky-700 hover:bg-gray-50 outline-none"
              >
                <FilmIcon className="h-6" />
                {t('videos')}
              </Link>
              <Link
                href="/hymns"
                onClick={() => setMobileMenuOpen(false)}
                className="-mx-6 flex items-center gap-3 rounded-lg px-6 py-2 text-base font-semibold leading-7 text-sky-700 hover:bg-gray-50 outline-none hidden"
              >
                <MusicalNoteIcon className="h-6" />
                {t('hymns')}
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
}
