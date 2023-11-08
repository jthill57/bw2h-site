import { createConfig as createDefaultConfig } from './sites/default';
import { createConfig as createSHBCConfig } from './sites/shbc';

export const appConfig = getConfig();

function getConfig() {
  switch (process.env.SITE) {
    case 'SHBC':
      return createSHBCConfig();
    default:
      return createDefaultConfig();
  }
}
