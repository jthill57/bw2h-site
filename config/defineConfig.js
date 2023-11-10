import { deepSpread } from "@/lib/helpers";
import { DEFAULT_CONFIG  } from "@/lib/constants";

export function defineConfig(config) {
  return deepSpread(DEFAULT_CONFIG, config);
}
