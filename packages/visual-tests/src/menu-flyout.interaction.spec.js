const { test, expect } = require('./test-fixtures');

test('menu flyout opens, moves focus, and selects with the keyboard @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-flyout-menu--standard');
  const flyout = page.locator('scale-menu-flyout');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  const first = page.getByRole('menuitem', {
    name: 'Menu Item 1',
    exact: true,
  });
  const second = page.getByRole('menuitem', {
    name: 'Menu Item 2',
    exact: true,
  });
  const selections = [];

  await page.exposeFunction('recordMenuSelect', (detail) =>
    selections.push(detail)
  );
  await flyout.evaluate((element) => {
    element.addEventListener('scale-select', (event) => {
      window.recordMenuSelect({
        eventType: event.detail.eventType,
        key: event.detail.key,
        item: event.detail.item.textContent.trim(),
      });
    });
  });

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(second).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect
    .poll(() => selections)
    .toEqual([{ eventType: 'keydown', key: 'Enter', item: 'Menu Item 2' }]);
});

test('menu flyout dismisses with Escape without selecting and reopens from trigger @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-flyout-menu--standard');
  const flyout = page.locator('scale-menu-flyout');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  const first = page.getByRole('menuitem', {
    name: 'Menu Item 1',
    exact: true,
  });
  const selections = [];

  await page.exposeFunction('recordMenuSelect', () => selections.push(true));
  await flyout.evaluate((element) => {
    element.addEventListener('scale-select', () => window.recordMenuSelect());
  });

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(first).toBeHidden();
  await expect.poll(() => selections).toHaveLength(0);

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toBeVisible();
  await expect.poll(() => selections).toHaveLength(0);
});
