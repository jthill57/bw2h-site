export async function getLanguages(API_KEY) {
  const languages = await fetch(`https://api.i18nexus.com/project_resources/languages.json?api_key=${API_KEY}&ts=${Date.now()}`)
    .then(response => response.json());

  return languages.collection;
}

export function checkDiff(a, b) {
  if (typeof a !== typeof b) { return true; }
  if (Number.isNaN(a)) { return !Number.isNaN(b); }
  if (typeof a !== 'object' || a === null || b === null) { return a !== b; }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) { return true; }
  if (new Set([...aKeys, ...aKeys]).size !== aKeys.length) { return true; }

  return aKeys.some((key) => checkDiff(a[key], b[key]));
}

export function deepSpread(a, b) {
  const prim = ['number', 'string', 'undefined', 'boolean'];
  if (b === undefined) { return a; }
  if (prim.includes(typeof a)) { return b; }
  if ([a, b].includes(null)) { return b; }
  if (Array.isArray(a) || Array.isArray(b)) { return b; }

  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
  return keys.reduce((acc, key) => ({
    ...acc,
    [key]: deepSpread(a[key], b[key]),
  }), {});
}
