const { test, expect } = require('./test-fixtures');

test('sidebar child branch toggles by pointer and preserves its active link @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-sidebar-navigation--standard');
  const functionA = page.getByRole('button', {
    name: 'Function A',
    exact: true,
  });
  const endpoint1 = page.getByRole('link', {
    name: /Endpoint 1/,
    includeHidden: true,
  });

  await expect(functionA).toHaveAttribute('aria-expanded', 'true');
  await expect(endpoint1).toBeVisible();
  await expect(endpoint1).toHaveAttribute('aria-current', 'page');

  await functionA.click();
  await expect(functionA).toHaveAttribute('aria-expanded', 'false');
  await expect(endpoint1).toBeHidden();
  await expect(endpoint1).toHaveAttribute('aria-current', 'page');

  await functionA.click();
  await expect(functionA).toHaveAttribute('aria-expanded', 'true');
  await expect(endpoint1).toBeVisible();
  await expect(endpoint1).toHaveAttribute('aria-current', 'page');
});

test('sidebar child branch toggles by keyboard with visible children @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-sidebar-navigation--standard');
  const functionA = page.getByRole('button', {
    name: 'Function A',
    exact: true,
  });
  const endpoint1 = page.getByRole('link', { name: /Endpoint 1/ });

  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Overview', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'Reference', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(functionA).toBeFocused();

  await page.keyboard.press('Space');
  await expect(functionA).toHaveAttribute('aria-expanded', 'false');
  await expect(endpoint1).toBeHidden();

  await page.keyboard.press('Enter');
  await expect(functionA).toHaveAttribute('aria-expanded', 'true');
  await expect(endpoint1).toBeVisible();
  await expect(endpoint1).toHaveAttribute('aria-current', 'page');
});
