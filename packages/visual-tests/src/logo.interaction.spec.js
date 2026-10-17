const { test, expect } = require('./test-fixtures');

test.beforeEach(async ({ page }) => {
  await page.route('https://www.telekom.de/start', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>Logo destination</title>',
    })
  );
});

test('logo link navigates to its configured destination with a pointer @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-logo--link');
  const link = page.getByRole('link');

  await expect(link).toHaveAttribute('href', 'https://www.telekom.de/start');
  await Promise.all([
    page.waitForURL('https://www.telekom.de/start', { waitUntil: 'commit' }),
    link.click(),
  ]);
});

test('logo link navigates to its configured destination with Enter @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-logo--link');
  const link = page.getByRole('link');

  await expect(link).toHaveAttribute('href', 'https://www.telekom.de/start');
  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  await Promise.all([
    page.waitForURL('https://www.telekom.de/start', { waitUntil: 'commit' }),
    page.keyboard.press('Enter'),
  ]);
});
