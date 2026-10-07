const { test } = require('./test-fixtures');
test.describe('Dropdown', () => {
  for (const [variant] of [
    ['standard'],
    ['disabled'],
    ['error'],
    ['success'],
    ['warning'],
    ['with-custom-icon'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`deprecated-components-dropdown--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`deprecated-components-dropdown--${variant}`);
      const dropdown = page.locator(
        ':is(#root, #storybook-root) > scale-dropdown .input__dropdown'
      );
      await dropdown.hover();
      await story.screenshot('hover.png');
      await dropdown.focus();
      await story.screenshot('focus.png');
      await page.mouse.move(60, 60);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
