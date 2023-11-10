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
      'en': 'https://bw2h.b-cdn.net/Gospel%20Presentation.mp4',
    },
  });
}
