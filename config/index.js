import { createConfig as createDefaultConfig } from './sites/default';
import { createConfig as createSHBCConfig } from './sites/shbc';
import { createConfig as createSFBCConfig } from './sites/sfbc';

export const appConfig = getConfig();

function getConfig() {
  switch (process.env.SITE) {
    case 'SHBC':
      return createSHBCConfig();
    case 'SFBC':
      return createSFBCConfig();
    default:
      return createDefaultConfig();
  }
}
