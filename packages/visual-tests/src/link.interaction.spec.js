const { test, expect } = require('./test-fixtures');

test('link navigates to its configured href with a pointer @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-link--standard');
  const link = page.getByRole('link', { name: 'A link' });
  const expectedURL = `${page.url()}#top`;

  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(expectedURL);
});

test('link navigates to its configured href with Enter @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-link--standard');
  const link = page.getByRole('link', { name: 'A link' });
  const expectedURL = `${page.url()}#top`;

  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(expectedURL);
});

test('disabled link blocks pointer and keyboard navigation @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-link--disabled');
  const component = page.locator('scale-link');
  await component.evaluate((element) => {
    element.href = '#destination';
  });
  const link = page.getByRole('link', { name: 'A link, disabled' });
  const initialURL = page.url();

  await expect(link).toHaveAttribute('aria-disabled', 'true');
  await expect(link).toHaveAttribute('tabindex', '-1');
  const bounds = await link.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.click(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2
  );
  await expect(page).toHaveURL(initialURL);

  await page.keyboard.press('Tab');
  await expect(link).not.toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(initialURL);
});
