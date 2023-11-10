import { defineConfig } from '../defineConfig';

export function createConfig() {
  return defineConfig({
    name: 'Strong Hold',
    subName: 'Baptist Church',
    showName: false,
    logo: {
      url: '/images/shbc_logo.png',
      height: 42,
      width: 256,
    },
    languages: {
      disable: [],
      feature: ['en', 'es-MX', 'pt-BR'],
    },
    videos: {
      'en': 'https://www.kjv1611only.com/video/01salvation/Pastor_Berzins.mp4',
    },
  });
}
