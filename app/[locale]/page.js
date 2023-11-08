
import initTranslations from '../i18n';

import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import TranslationsProvider from '@/components/TranslationsProvider';

export default async function Home({ params: { locale } }) {
  const { t, options } = await initTranslations(locale, ['home']);

  return (
    <TranslationsProvider namespaces={options.ns} locale={locale}>
      <main className="flex min-h-screen flex-col items-center">
        <Header />
        <LandingPage />
      </main>
    </TranslationsProvider>
  );
}
