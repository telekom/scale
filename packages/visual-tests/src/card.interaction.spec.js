const { test, expect } = require('./test-fixtures');

test('linked card opens its destination with Enter @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-card--with-link');
  const link = page.getByRole('link', { name: 'Lorem ipsur dolor sit amet' });

  await page.context().route('https://example.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<title>Card destination</title>',
    })
  );

  await expect(link).toHaveAttribute('href', 'https://example.com');
  await expect(link).toHaveAttribute('target', '_blank');
  await link.focus();
  await expect(link).toBeFocused();

  const destinationPromise = page.context().waitForEvent('page');
  await page.keyboard.press('Enter');
  const destination = await destinationPromise;
  await expect(destination).toHaveURL('https://example.com/');
  await expect(destination).toHaveTitle('Card destination');
});
