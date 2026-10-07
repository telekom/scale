const { test } = require('./test-fixtures');
test.describe('Switch', () => {
  for (const [variant] of [
    ['standard'],
    ['small'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['android'],
    ['android-disabled'],
    ['android-selected'],
    ['android-selected-disabled'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-switch--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['selected'], ['android-selected']]) {
    test(`${variant} hover`, async ({ page, story }) => {
      await story.open(`components-switch--${variant}`);
      const firstButton = page.locator(
        ':is(#root, #storybook-root) scale-switch'
      );
      await firstButton.hover();
      await story.screenshot('hover.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} focus`, async ({ page, story }) => {
      await story.open(`components-switch--${variant}`);
      await page.keyboard.press('Tab');
      await story.screenshot('focus.png');
    });
  }
});
