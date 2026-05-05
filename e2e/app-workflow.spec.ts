import { expect, test } from '@playwright/test';

test('docs home loads', async ({ page }) => {
  await page.goto('/docs');
  await expect(
    page.getByRole('heading', { name: 'Quran data, API, docs, SDK. One system. Clean contracts.' }),
  ).toBeVisible();
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
