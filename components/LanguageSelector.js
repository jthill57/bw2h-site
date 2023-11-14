'use client';

import 'node_modules/flag-icons/css/flag-icons.min.css';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { useApp } from '@/context/AppContext';
import { LANGUAGE_NAMES } from '@/lib/constants';
import { getLanguages } from '@/lib/helpers';
import { Transition } from '@headlessui/react';

function FlagIcon({ language = {} }) {
  const { country_code, language_code } = language;

  let flag = country_code?.toLowerCase();
  if (!flag) {
    switch (language_code) {
      case 'en': flag = 'us'; break;
      case 'eo': flag = 'un'; break;
      case 'ht': flag = 'ht'; break;
      default: flag = 'xx'; break;
    }
  }

  return (
    <span
      className={`text-[1.125rem] fi fis rounded-full border-none shadow-md bg-white inline-block fi-${flag} flex-shrink-0`}
    />
  );
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

export const LanguageSelector = ({ hideNameOnMobile }) => {
  const app = useApp();
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.languages[0];
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const availableLanguages = await getLanguages(app.API_KEY);
      setLanguages(availableLanguages);
    };

    init();
  }, []);

  useEffect(() => {
    const handleWindowClick = (event) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    }
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('click', handleWindowClick);
    }
  }, []);

  if (!languages.length) return null;

  const handleLanguageChange = (newLocale) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const selectedLanguage = languages.find((lang) => lang.full_code === currentLocale);

  const featuredLanguages = app.languages.feature.map((lang) => languages.find((l) => l.full_code === lang));
  const otherLanguages = languages.filter((lang) => !app.languages.feature.includes(lang.full_code));

  const fixName = (name) => {
    return name.replace(/\s*\(.*?\)\s*/g, '');
  };

  const renderLanguageButton = (language, index) => {
    return (
      <button
        key={language.full_code}
        onClick={() => handleLanguageChange(language.full_code)}
        className={`${currentLocale === language.full_code
            ? "bg-gray-100 text-gray-900"
            : "text-gray-700"
          } px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 rounded-md`}
        role="menuitem"
      >
        <FlagIcon language={language} />
        <div className="ml-4 flex flex-col">
          <span className="truncate">{LANGUAGE_NAMES[language.full_code]}</span>
          <span className="truncate text-xs opacity-50">{fixName(language.name)}</span>
        </div>
      </button>
    );
  };

  return (
    <>
      <div className="flex items-center">
        <div className="relative inline-block text-left flex-1">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center w-full rounded-md px-6 py-4 lg:px-4 lg:py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id={LANGUAGE_SELECTOR_ID}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <FlagIcon language={selectedLanguage} />
              <span className={`${hideNameOnMobile ? 'hidden' : ''} md:inline ml-2`}>
                {LANGUAGE_NAMES[selectedLanguage.full_code]}
              </span>
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Transition show={isOpen}>
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
              enterFrom="-bottom-[200px] top-[100vh]"
              enterTo="bottom-0 top-1/4"
              leave="transition-all duration-200"
              leaveFrom="bottom-0 top-1/4"
              leaveTo="-bottom-[200px] top-[100vh]"
              className="fixed z-40 left-0 right-0 overflow-auto px-4 rounded-t-lg bg-white"
            >
              {featuredLanguages.length ? (
                <div className="p-2">
                  <h3 className="m-4">{t('featured_languages')}</h3>
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-3" role="none">
                    {featuredLanguages.map(renderLanguageButton)}
                  </div>
                </div>
              ) : null}
              <div className="p-2">
                <h3 className="m-4">{t('other_languages')}</h3>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-3" role="none">
                  {otherLanguages.map(renderLanguageButton)}
                </div>
              </div>
            </Transition.Child>
          </Transition>
        </div>
      </div>
    </>
  );
};
