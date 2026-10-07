const { test, expect } = require('./test-fixtures');

const openMenu = async (page, story, variant) => {
  await story.open(`components-flyout-menu--${variant}`);
  await page.addStyleTag({ content: 'body { min-height: 768px; }' });
};

test.describe('Menu', () => {
  for (const variant of ['standard', 'cascading-menu', 'checked-toggle']) {
    test(`${variant}`, async ({ page, story }) => {
      await openMenu(page, story, variant);
      const trigger = page.getByRole('button');
      const item = page.locator('scale-menu-flyout-item').first();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(item).toBeHidden();
      await story.screenshot('default.png');
    });
  }
  for (const variant of ['standard', 'cascading-menu']) {
    test(`${variant} selected`, async ({ page, story }) => {
      await openMenu(page, story, variant);
      const trigger = page.getByRole('button');
      const first = page.getByRole('menuitem', {
        name: variant === 'standard' ? 'Menu Item 1' : 'Item Title',
        exact: true,
      });
      const second = page.getByRole('menuitem', {
        name:
          variant === 'standard'
            ? 'Menu Item 2'
            : 'Really Quite Long Item Title',
        exact: true,
      });
      await trigger.click();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect(first).toBeVisible();
      await expect(first).toBeFocused();
      await story.screenshot('selected.png');
      await page.keyboard.press('ArrowDown');
      await expect(second).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(first).toBeHidden();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await story.screenshot('closed-after-selection.png');
    });
  }

  test('cascading-menu states', async ({ page, story }) => {
    await openMenu(page, story, 'cascading-menu');
    const trigger = page.getByRole('button');
    const first = page.getByRole('menuitem', {
      name: 'Item Title',
      exact: true,
    });
    const disabled = page.getByRole('menuitem', { name: 'Item With Suffix 3' });
    const options = page.getByRole('menuitem', { name: 'Other Options' });
    const prefixOne = page.getByRole('menuitem', {
      name: 'Item With Prefix 1',
      exact: true,
    });
    const prefixTwo = page.getByRole('menuitem', {
      name: 'Item With Prefix 2',
    });
    const thirdLevel = page.getByRole('menuitem', {
      name: 'Third Level Item 1',
      exact: true,
    });

    await trigger.click();
    await expect(first).toBeFocused();
    await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await options.hover();
    await expect(prefixOne).toBeHidden();
    await story.screenshot('hover.png');
    for (let step = 0; step < 4; step += 1) {
      await page.keyboard.press('ArrowDown');
    }
    await expect(disabled).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(first).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(prefixOne).toBeHidden();
    await page.keyboard.press('ArrowDown');
    await expect(options).toBeFocused();
    await story.screenshot('keyboard.png');
    await options.click();
    await expect(prefixOne).toBeVisible();
    await expect(prefixOne).toBeFocused();
    await story.screenshot('selected.png');
    await page.keyboard.press('ArrowDown');
    await expect(prefixTwo).toBeFocused();
    await story.screenshot('focus.png');
    await page.keyboard.press('ArrowRight');
    await expect(thirdLevel).toBeVisible();
    await expect(thirdLevel).toBeFocused();
    await story.screenshot('selected-2.png');
    await page.keyboard.press('ArrowLeft');
    await expect(thirdLevel).toBeHidden();
    await expect(prefixTwo).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(prefixOne).toBeHidden();
    await expect(options).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(first).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await story.screenshot('closed.png');
  });

  test('checked-toggle interactions', async ({ page, story }) => {
    await openMenu(page, story, 'checked-toggle');
    const trigger = page.getByRole('button', { name: 'Options' });
    const first = page.getByRole('menuitemcheckbox', {
      name: 'Toggle option 1',
    });
    const second = page.getByRole('menuitemcheckbox', {
      name: 'Toggle option 2',
    });
    await trigger.click();
    await expect(first).toBeFocused();
    await expect(first).not.toBeChecked();
    await expect(second).toBeChecked();
    await story.screenshot('opened.png');
    await first.click();
    await expect(first).toBeChecked();
    await expect(second).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await story.screenshot('checked.png');
    await page.keyboard.press('ArrowDown');
    await expect(second).toBeFocused();
    await page.keyboard.press('Space');
    await expect(second).not.toBeChecked();
    await expect(first).toBeChecked();
    await story.screenshot('unchecked.png');
    await trigger.click();
    await expect(first).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await story.screenshot('closed.png');
  });
});
