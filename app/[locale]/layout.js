import { headers } from 'next/headers';
import { Inter } from 'next/font/google'
import '../globals.css'

import { getAppConfig } from '@/config';
import { AppProvider } from '@/context/AppContext';
import TranslationsProvider from '@/components/TranslationsProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bible Way to Heaven',
  description: 'If you died today, are you 100% sure you would go to heaven?',
}

export default function RootLayout({ children, params: { locale } }) {
  const headersList = headers();
  const host = headersList.get('host') || "";

  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta property="og:image" content="/images/bw2h_logo_simple.png" />
      <script async defer data-website-id="109194fd-6cc3-4826-8f93-db4aaef2d1e6" src="https://bw2h-stats.vercel.app/umami.js?v=1"></script>
      <body className={inter.className}>
        <AppProvider config={getAppConfig(host)} apiKey={process.env.I18NEXUS_API_KEY}>
          <TranslationsProvider locale={locale} namespaces={['home']}>
            <main className="flex min-h-screen flex-col items-center">
              <Header />
              {children}
            </main>
          </TranslationsProvider>
        </AppProvider>
      </body>
    </html>
  )
}
