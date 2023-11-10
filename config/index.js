import { createConfig as createDefaultConfig } from './sites/default';
import { createConfig as createSHBCConfig } from './sites/shbc';
import { createConfig as createSFBCConfig } from './sites/sfbc';
import { createConfig as createLBCDurhamConfig } from './sites/lbc_durham';

export const appConfig = getConfig();

function getConfig() {
  switch (process.env.SITE) {
    case 'SHBC':
      return createSHBCConfig();
    case 'SFBC':
      return createSFBCConfig();
    case 'LBC_DURHAM':
      return createLBCDurhamConfig();
    default:
      return createDefaultConfig();
  }
}
