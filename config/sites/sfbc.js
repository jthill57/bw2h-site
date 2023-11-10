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
      'en': 'https://repackager.wixmp.com/wixmp-vod/ba5e41cf-4675-4b90-a543-c77d39ebca76/video/06429383012f40afbeb2bf6e1cb2998b/,480p,720p,1080p,/mp4/file.mp4.urlset/master.m3u8?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlb19pZCI6IjA2NDI5MzgzMDEyZjQwYWZiZWIyYmY2ZTFjYjI5OThiIiwiaXNfY2xpcCI6ZmFsc2UsImlhdCI6MTY5OTU3ODAwMCwiZXhwIjoxNjk5NjY0NDAwLCJpc3MiOiJhcHA6dm9kIiwic3ViIjoidXNlcjp2b2QifQ.P1b8S6dQGtHOElNl7LDWEG2tKhYmFefo0g_DRNeZH6E',
    },
  });
}
