import { defineConfig } from '../defineConfig';

export function createConfig() {
  return defineConfig({
    name: 'Liberty',
    subName: 'Baptist Church',
    showName: true,
    logo: {
      url: '/images/lbc_durham_logo.png',
      height: 42,
      width: 42,
    },
    languages: {
      disable: [],
      feature: ['en', 'es-MX'],
    },
    videos: {
      'en': 'https://stream.mux.com/vDfyo9dSDwYNDQdY7gkSwdtGEgCeKVUecO01BLUFAmmo.m3u8',
    },
  });
}
