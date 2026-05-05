import packageJson from '@/package.json';

export const appVersion = packageJson.version;
export const appStageLabel = 'MVP';

export function formatAppReleaseLabel() {
  return `v${appVersion} (${appStageLabel})`;
}
