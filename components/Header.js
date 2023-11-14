'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Disclosure } from '@headlessui/react'

import { LanguageSelector } from './LanguageSelector';
import { useApp } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';
import { Bars3Icon, FilmIcon, MusicalNoteIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const app = useApp();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? <XMarkIcon className="x-6 w-6" aria-hidden="true" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
        <div className="hidden lg:flex flex-1 justify-end -mx-2">
          <LanguageSelector hideNameOnMobile />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
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
      </Dialog>
    </header>
  );
}
