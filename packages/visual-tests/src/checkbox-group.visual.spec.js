const { test } = require('./test-fixtures');
test.describe('CheckboxGroup', () => {
  for (const [variant] of [
    ['standard'],
    ['checkbox-disabled'],
    ['group-error'],
    ['helper-text'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-checkbox-group--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-checkbox-group--${variant}`);
      const firstCheckbox = page.locator(
        ':is(#root, #storybook-root) > scale-checkbox-group > scale-checkbox:nth-child(1) > input[type=checkbox]'
      );
      const label = page.locator(
        ':is(#root, #storybook-root) > scale-checkbox-group > scale-checkbox:nth-child(1) > label'
      );
      await label.hover();
      await story.screenshot('hover.png');
      await firstCheckbox.focus();
      await story.screenshot('focus.png');
      await page.mouse.move(20, 40);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
