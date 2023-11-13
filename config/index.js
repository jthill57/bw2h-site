import { getValidSubdomain } from '@/lib/helpers';
import { defineConfig } from './defineConfig';
import { ENABLED_CONFIGS, SITES } from '@/lib/constants';

const SITE_CONFIGS = {
  [SITES.SHBC]: require('./sites/shbc.js').default,
  [SITES.SFBC]: require('./sites/sfbc.js').default,
  [SITES.LBC_DURHAM]: require('./sites/lbc_durham.js').default,
}

export function getAppConfig(host) {
  const subdomain = getValidSubdomain(host);
  const siteConfig = SITE_CONFIGS[subdomain];

  if (ENABLED_CONFIGS.includes(subdomain)) return defineConfig(siteConfig);
  return defineConfig();
}
