const { test, expect } = require('./test-fixtures');

test('clicking a tab selects its panel @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tab-navigation--text-only');
  const generalTab = page.getByRole('tab', { name: 'General', exact: true });
  const usageTab = page.getByRole('tab', { name: 'Usage', exact: true });
  const panels = page.getByRole('tabpanel', { includeHidden: true });
  const generalPanel = panels.nth(0);
  const usagePanel = panels.nth(1);

  await expect(generalTab).toHaveAttribute('aria-selected', 'true');
  await expect(generalPanel).toBeVisible();
  await usageTab.click();

  await expect(usageTab).toHaveAttribute('aria-selected', 'true');
  await expect(generalTab).toHaveAttribute('aria-selected', 'false');
  await expect(usagePanel).toBeVisible();
  await expect(generalPanel).toBeHidden();
});

test('ArrowRight selects the next tab and panel @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-tab-navigation--text-only');
  const generalTab = page.getByRole('tab', { name: 'General', exact: true });
  const usageTab = page.getByRole('tab', { name: 'Usage', exact: true });
  const panels = page.getByRole('tabpanel', { includeHidden: true });
  const generalPanel = panels.nth(0);
  const usagePanel = panels.nth(1);

  await page.keyboard.press('Tab');
  await expect(generalTab).toBeFocused();
  await expect(generalPanel).toBeVisible();
  await page.keyboard.press('ArrowRight');

  await expect(usageTab).toBeFocused();
  await expect(usageTab).toHaveAttribute('aria-selected', 'true');
  await expect(generalTab).toHaveAttribute('aria-selected', 'false');
  await expect(usagePanel).toBeVisible();
  await expect(generalPanel).toBeHidden();
});
