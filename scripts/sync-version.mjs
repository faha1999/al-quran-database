import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const rootPackagePath = path.join(repoRoot, 'package.json');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function getLatestGitTag() {
  try {
    const tag = execSync('git tag --sort=-version:refname | head -n 1', {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim();

    return tag || null;
  } catch {
    return null;
  }
}

function normalizeVersion(tag) {
  const normalized = tag.startsWith('v') ? tag.slice(1) : tag;

  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(normalized)) {
    throw new Error(`Latest git tag "${tag}" is not a valid package version.`);
  }

  return normalized;
}

function syncRootPackage(version) {
  const filePath = rootPackagePath;
  const packageJson = readJson(filePath);

  if (packageJson.version !== version) {
    packageJson.version = version;
    writeJson(filePath, packageJson);
  }
}

function syncSdkPackage(version) {
  const filePath = path.join(repoRoot, 'packages/sdk/package.json');
  const packageJson = readJson(filePath);

  if (packageJson.version !== version) {
    packageJson.version = version;
    writeJson(filePath, packageJson);
  }
}

function syncPackageLock(version) {
  const filePath = path.join(repoRoot, 'package-lock.json');
  const packageLock = readJson(filePath);

  packageLock.version = version;

  if (packageLock.packages?.['']) {
    packageLock.packages[''].version = version;
  }

  if (packageLock.packages?.['packages/sdk']) {
    packageLock.packages['packages/sdk'].version = version;
  }

  writeJson(filePath, packageLock);
}

const currentRootVersion = readJson(rootPackagePath).version;
const latestGitTag = getLatestGitTag();
const version = latestGitTag ? normalizeVersion(latestGitTag) : currentRootVersion;

syncRootPackage(version);
syncSdkPackage(version);
syncPackageLock(version);

if (latestGitTag) {
  console.log(`Synced package manifests to ${version} from git tag ${latestGitTag}`);
} else {
  console.warn(`No git tags found. Kept committed package version ${version}.`);
}
