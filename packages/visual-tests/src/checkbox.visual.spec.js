const { test, expect } = require('./test-fixtures');
test.describe('Checkbox', () => {
  for (const [variant] of [
    ['standard'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['helper-text'],
    ['error'],
    ['custom-label'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-checkbox--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant, state] of [
    ['standard', 'hover'],
    ['selected', 'hover'],
    ['custom-label', 'hover'],
    ['standard', 'active'],
    ['selected', 'active'],
    ['custom-label', 'active'],
    ['standard', 'focus'],
    ['selected', 'focus'],
    ['custom-label', 'focus'],
  ]) {
    test(`${variant} ${state} states`, async ({ page, story }) => {
      await story.open(`components-checkbox--${variant}`);
      const checkbox = page.locator(
        ':is(#root, #storybook-root) > scale-checkbox > label'
      );
      if (state === 'hover') {
        await checkbox.hover();
        await story.screenshot('hover.png');
      }
      if (state === 'active') {
        const input = page.locator('scale-checkbox').getByRole('checkbox');
        if (variant === 'selected') await expect(input).toBeChecked();
        else await expect(input).not.toBeChecked();
        await checkbox.hover();
        await page.mouse.down();
        await expect
          .poll(() =>
            checkbox.evaluate((element) => element.matches(':active'))
          )
          .toBe(true);
        await story.screenshot('active.png');
        await page.mouse.up();
      }
      if (state === 'focus') {
        const input = page.locator('scale-checkbox').getByRole('checkbox');
        await input.focus();
        await expect(input).toBeFocused();
        await story.screenshot('focus.png');
      }
    });
  }
});
