import { defineConfig } from '../defineConfig';

export function createConfig() {
  return defineConfig({
    name: 'Sure Foundation',
    subName: 'Baptist Church',
    showName: true,
    logo: {
      url: '/images/sfbc_logo.png',
      height: 42,
      width: 56,
    },
    languages: {
      disable: [],
      feature: ['en', 'ru-RU', 'uk-UA', 'es-MX'],
    },
    videos: {
      'en': 'https://stream.mux.com/UFHaz802IQIvq985IVCwLxwOJ2gETDLWMXzxnZsen01cA.m3u8',
    },
  });
}
