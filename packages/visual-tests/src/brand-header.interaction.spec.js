const { test, expect } = require('./test-fixtures');

test('brand header mega menu opens on hover and closes with Escape @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-telekom-brand-header-navigation--mega-menu');
  const trigger = page.getByRole('menuitem', { name: 'Topic One' });
  const flyout = page.locator('scale-telekom-nav-flyout').first();
  const menuLink = flyout
    .getByRole('link', {
      name: 'Second Level',
      exact: true,
    })
    .first();

  await trigger.hover();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(menuLink).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(menuLink).toBeHidden();
  await expect(trigger).toBeFocused();
});
