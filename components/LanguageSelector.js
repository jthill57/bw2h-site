'use client';

import 'node_modules/flag-icons/css/flag-icons.min.css';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

function FlagIcon({ countryCode = "" }) {
  return (
    <span
      className={`fi fis text-lg rounded-full border-none shadow-md bg-white inline-block fi-${countryCode}`}
    />
  );
}

const LANGUAGE_SELECTOR_ID = 'language-selector';
const languages = [
  {key: 'en', name: 'English', flag: 'us'},
  {key: 'de', name: 'German', flag: 'de'},
  {key: 'es', name: 'Spanish', flag: 'mx'},
  {key: 'pt', name: 'Portuguese', flag: 'pt'},
]

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + language.key + currentPathname);
    } else {
      if (language.key === i18nConfig.defaultLocale) {
        router.push(
          currentPathname.replace(currentLocale, '')
        );
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${language.key}`)
        );
      }
    }

    router.refresh();
  };

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

  const selectedLanguage = languages.find((l) => l.key === currentLocale);

  return (
    <>
      <div className="flex items-center -mx-2">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center w-full rounded-md px-4 py-2 -my-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id={LANGUAGE_SELECTOR_ID}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <FlagIcon countryCode={selectedLanguage.flag} />
              <span className="hidden lg:inline ml-2">{selectedLanguage.name}</span>
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
          {isOpen && <div
            className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-selector"
          >
            <div className="py-1 grid grid-cols-2 gap-2" role="none">
              {languages.map((language, index) => {
                return (
                  <button
                    key={language.key}
                    onClick={() => handleLanguageChange(language)}
                    className={`${currentLocale === language.key
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                      } block px-4 py-2 text-sm text-left items-center inline-flex hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                    role="menuitem"
                  >
                    <FlagIcon countryCode={language.flag} />
                    <span className="truncate ml-2">{language.name}</span>
                  </button>
                );
              })}
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};
