import { expect, test } from '@playwright/test';

test('docs home loads', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByText('Developer Platform')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: /One Dataset\.\s*Infinite Possibilities\./i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /SDK Guide/i }).first()).toBeVisible();
  await expect(
    page.getByText(
      'SQLite and PostgreSQL artifacts generated from committed JSON source of truth.',
    ),
  ).toBeVisible();
});

test('sdk docs page renders install and method coverage', async ({ page }) => {
  await page.goto('/docs/sdk');
  await expect(page.getByRole('heading', { name: 'SDK Guide' })).toBeVisible();
  await expect(page.getByText('npm install @faha1999/al-quran-database')).toBeVisible();
  await expect(page.getByText('getResearchReferences()')).toBeVisible();
  await expect(page.getByText('graphql({ query, variables? })')).toBeVisible();
});

test('api reference shows stable routes and graphql endpoint', async ({ page }) => {
  await page.goto('/docs/api-reference');
  await expect(page.getByRole('heading', { name: 'API Reference' })).toBeVisible();
  await expect(page.getByText('/api/v1/graphql')).toBeVisible();
  await expect(page.getByText('/api/v1/search?q=mercy&language=en&limit=5')).toBeVisible();
  await expect(page.getByText('/api/v1/meta')).toBeVisible();
});

test('database docs expose export downloads', async ({ page }) => {
  await page.goto('/docs/database');
  await expect(page.getByRole('heading', { name: /JSON-first dataset\./i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download Export' }).first()).toHaveAttribute(
    'href',
    '/quran_indexed.sqlite',
  );
  await expect(page.getByText('Versioned Runtime')).toBeVisible();
});

test('search page renders workflow controls', async ({ page }) => {
  await page.goto('/search');
  await page.waitForLoadState('networkidle');
  await expect(
    page.getByPlaceholder('Search for "patience", "mercy", or "knowledge"...'),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeVisible();
  await expect(page.getByText('Advanced Edition Filters')).toBeVisible();
});

test('api endpoint returns success', async ({ request }) => {
  const response = await request.get('/api/search?q=mercy&language=en');
  const payload = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(payload.success).toBeTruthy();
  expect(payload.data.length).toBeGreaterThan(0);
});
