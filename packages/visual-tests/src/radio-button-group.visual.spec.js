const { test, expect } = require('./test-fixtures');
test.describe('RadioButtonGroup', () => {
  for (const [variant] of [
    ['standard'],
    ['helper-text'],
    ['error'],
    ['disabled'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-radio-button-group--${variant}`);
      const group = page.locator('scale-radio-button-group');
      const radios = group.getByRole('radio', { name: 'Radio Label' });
      await expect(group).toBeVisible();
      await expect(
        group.getByText('Group Label', { exact: true })
      ).toBeVisible();
      await expect(radios).toHaveCount(3);
      for (const radio of await radios.all()) {
        await expect(radio).toBeVisible();
      }
      await expect(radios.nth(1)).not.toBeChecked();
      await expect(radios.nth(2)).not.toBeChecked();
      if (variant === 'error') {
        await expect(radios.first()).toBeChecked();
        await expect(radios.first()).toHaveAttribute('aria-invalid', 'true');
        await expect(group.getByText('Something is wrong')).toBeVisible();
        await expect(group.getByText('Error message')).toBeVisible();
      } else {
        await expect(radios.first()).not.toBeChecked();
      }
      if (variant === 'helper-text') {
        await expect(group.getByText('Make sure to fill this')).toBeVisible();
      }
      for (const [index, radio] of (await radios.all()).entries()) {
        if (variant === 'disabled' && index === 0) {
          await expect(radio).toBeDisabled();
        } else {
          await expect(radio).toBeEnabled();
        }
      }
      await story.screenshot('default.png');
      if (variant === 'disabled') {
        await group
          .locator('scale-radio-button')
          .first()
          .locator('label')
          .hover();
        await page.mouse.down();
        try {
          await expect(radios.first()).not.toBeChecked();
        } finally {
          await page.mouse.up();
        }
        await expect(radios.first()).not.toBeChecked();
        await radios.nth(1).check();
        await expect(radios.nth(1)).toBeChecked();
        await expect(radios.first()).not.toBeChecked();
        await expect(radios.nth(2)).not.toBeChecked();
        await story.screenshot('enabled-selected.png');
      }
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-radio-button-group--${variant}`);
      const group = page.locator('scale-radio-button-group');
      const radios = group.getByRole('radio', { name: 'Radio Label' });
      const firstRadioButton = radios.first();
      const groupLabel = group.getByText('Group Label', { exact: true });
      await expect(radios).toHaveCount(3);
      await page.keyboard.press('Tab');
      await expect(firstRadioButton).toBeFocused();
      await expect(firstRadioButton).not.toBeChecked();
      await story.screenshot('focus.png');
      await groupLabel.click();
      await expect(firstRadioButton).not.toBeFocused();
      await firstRadioButton.hover();
      await expect(group.locator('input:hover')).toHaveCount(1);
      await story.screenshot('hover.png');
      await page.mouse.down();
      try {
        await expect(group.locator('input:active')).toHaveCount(1);
        await expect(firstRadioButton).not.toBeChecked();
        await story.screenshot('active.png');
      } finally {
        await page.mouse.up();
      }
      await expect(firstRadioButton).toBeChecked();
      await expect(radios.nth(1)).not.toBeChecked();
      await expect(radios.nth(2)).not.toBeChecked();
      await story.screenshot('selected.png');
      await radios.nth(1).check();
      await expect(radios.nth(1)).toBeChecked();
      await expect(firstRadioButton).not.toBeChecked();
      await expect(radios.nth(2)).not.toBeChecked();
      await expect(group.locator('scale-radio-button[checked]')).toHaveCount(1);
      await story.screenshot('selection-changed.png');
    });
  }
});
