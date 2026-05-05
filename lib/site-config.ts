export const repositoryUrl = 'https://github.com/faha1999/al-quran-database';
export const npmPackageUrl = 'https://www.npmjs.com/package/@faha1999/al-quran-database';
export const npmPackageName = '@faha1999/al-quran-database';
export const officialHostedApiUrl = 'https://al-quran-database.vercel.app';
export const officialHostedApiHost = 'al-quran-database.vercel.app';
export const localDevBaseUrl = 'http://localhost:3000';
export const selfHostPlaceholderUrl = 'https://your-domain.example';

export function normalizeHostname(hostname: string) {
  return hostname.toLowerCase().replace(/:\d+$/, '');
}

export function isHostedApiDisabledHost(hostname: string) {
  return normalizeHostname(hostname) === officialHostedApiHost;
}
