const { test, expect } = require('./test-fixtures');
test.describe('DropdownSelect', () => {
  for (const [variant] of [['standard'], ['disabled'], ['error']]) {
    const state = variant === 'disabled' ? 'remains closed' : 'open';
    test(`${variant} ${state}`, async ({ page, story }) => {
      await story.open(`components-dropdown-select--${variant}`);
      const dropdown = page.locator(
        ':is(#root, #storybook-root) > div > scale-dropdown-select'
      );
      const select = dropdown.getByRole('combobox');
      const listbox = dropdown.getByRole('listbox', { includeHidden: true });
      const chosenValue = select.locator('[part="combobox-value"]');
      await expect(select).toBeVisible();
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await expect(listbox).toBeHidden();
      const initialValue = await chosenValue.innerText();
      if (variant === 'disabled') {
        await expect(select).toHaveAttribute('tabindex', '-1');
      } else {
        await expect(select).toHaveAttribute('tabindex', '0');
      }
      if (variant === 'error') {
        await expect(select).toHaveAttribute('aria-invalid', 'true');
      }
      await story.screenshot('default.png');
      if (variant === 'disabled') {
        await select.hover();
        await page.mouse.down();
        await page.mouse.up();
        await expect(select).toHaveAttribute('aria-expanded', 'false');
        await expect(listbox).toBeHidden();
        await expect(chosenValue).toHaveText(initialValue);
        await story.screenshot('closed.png');
      } else {
        await select.click();
        await expect(select).toHaveAttribute('aria-expanded', 'true');
        await expect(listbox).toBeVisible();
        await expect(listbox.getByRole('option')).toHaveCount(3);
        const caspar = listbox.getByRole('option', { name: /Caspar/ });
        const cedric = listbox.getByRole('option', { name: /Cedric/ });
        await expect(caspar).toBeVisible();
        await expect(cedric).toBeVisible();
        await expect(
          listbox.getByRole('option', { name: /Cem/ })
        ).toBeVisible();
        if (variant === 'standard') {
          await expect(chosenValue).toHaveText('Caspar');
          await expect(caspar).toHaveAttribute('aria-selected', 'true');
        }
        await story.screenshot('selected.png');
        await select.click();
        await expect(select).toHaveAttribute('aria-expanded', 'false');
        await expect(listbox).toBeHidden();
        await select.click();
        await expect(listbox).toBeVisible();
        await expect(cedric).not.toHaveAttribute('aria-disabled', 'true');
        await cedric.click();
        await expect(select).toHaveAttribute('aria-expanded', 'false');
        await expect(listbox).toBeHidden();
        await expect(chosenValue).toHaveText('Cedric');
        await expect(chosenValue).not.toHaveText(initialValue);
        await select.click();
        await expect(listbox).toBeVisible();
        await expect(cedric).toHaveAttribute('aria-selected', 'true');
        await expect(caspar).not.toHaveAttribute('aria-selected', 'true');
        await select.press('Escape');
        await expect(select).toHaveAttribute('aria-expanded', 'false');
        await expect(listbox).toBeHidden();
        await expect(chosenValue).toHaveText('Cedric');
        await story.screenshot('changed.png');
      }
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-dropdown-select--${variant}`);
      const select = page
        .locator(':is(#root, #storybook-root) > div > scale-dropdown-select')
        .getByRole('combobox');
      await select.hover();
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await story.screenshot('hover.png');
      await select.focus();
      await expect(select).toBeFocused();
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await story.screenshot('focus.png');
      const listbox = page
        .locator(':is(#root, #storybook-root) > div > scale-dropdown-select')
        .getByRole('listbox', { includeHidden: true });
      const chosenValue = select.locator('[part="combobox-value"]');
      await select.press('ArrowDown');
      await expect(select).toHaveAttribute('aria-expanded', 'true');
      await expect(listbox).toBeVisible();
      await select.press('Home');
      const caspar = listbox.getByRole('option', { name: /Caspar/ });
      await expect(select).toHaveAttribute(
        'aria-activedescendant',
        await caspar.getAttribute('id')
      );
      await select.press('ArrowDown');
      const cedric = listbox.getByRole('option', { name: /Cedric/ });
      await expect(select).toHaveAttribute(
        'aria-activedescendant',
        await cedric.getAttribute('id')
      );
      await expect(chosenValue).toHaveText('Caspar');
      await story.screenshot('keyboard-navigation.png');
      await select.press('Enter');
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await expect(listbox).toBeHidden();
      await expect(select).toBeFocused();
      await expect(chosenValue).toHaveText('Cedric');
      await select.press('End');
      await expect(listbox).toBeVisible();
      const cem = listbox.getByRole('option', { name: /Cem/ });
      await expect(select).toHaveAttribute(
        'aria-activedescendant',
        await cem.getAttribute('id')
      );
      await select.press('Escape');
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await expect(listbox).toBeHidden();
      await expect(chosenValue).toHaveText('Cedric');
      await select.press('End');
      await expect(listbox).toBeVisible();
      await select.press('Enter');
      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await expect(listbox).toBeHidden();
      await expect(chosenValue).toHaveText('Cem');
      await story.screenshot('keyboard-selected.png');
    });
  }
});
