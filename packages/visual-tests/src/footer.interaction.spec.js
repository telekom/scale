const { test, expect } = require('./test-fixtures');

test('footer navigation link supports keyboard activation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-telekom-footer--standard');
  const imprintLink = page.getByRole('link', { name: 'Imprint' });

  await page.keyboard.press('Tab');
  await expect(imprintLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#$/);
});
