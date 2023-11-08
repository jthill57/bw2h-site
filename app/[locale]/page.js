
import initTranslations from '../i18n';

import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import TranslationsProvider from '@/components/TranslationsProvider';
import { getLanguages } from '@/lib/helpers';
import { appConfig } from '@/config';


export default async function Home({ params: { locale } }) {
  const { t, options } = await initTranslations(locale, ['home']);
  const languages = await getLanguages(process.env.I18NEXUS_API_KEY);

  return (
    <AppProvider appConfig={appConfig}>
      <TranslationsProvider namespaces={options.ns} locale={locale}>
        <main className="flex min-h-screen flex-col items-center">
          <Header languages={languages} />
          <LandingPage />
        </main>
      </TranslationsProvider>
    </AppProvider>
  );
}
