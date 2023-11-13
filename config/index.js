
import { getValidSubdomain } from '@/lib/helpers';
import { defineConfig } from './defineConfig';
import { ENABLED_CONFIGS, SITES } from '@/lib/constants';

const SITE_CONFIGS = {
  [SITES.SHBC]: require('./sites/shbc.js'),
  [SITES.SFBC]: require('./sites/sfbc.js'),
  [SITES.LBC_DURHAM]: require('./sites/lbc_durham.js'),
}

export const appConfig = getConfig();

function getConfig() {
  const subdomain = getValidSubdomain();
  const siteConfig = SITE_CONFIGS[subdomain];

  if (ENABLED_CONFIGS.includes(subdomain)) return defineConfig(siteConfig);
  return defineConfig();
}
