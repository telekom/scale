const { test } = require('./test-fixtures');
test.describe('Link', () => {
  for (const [variant] of [['standard'], ['disabled'], ['with-icon']]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-link--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['with-icon']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-link--${variant}`);
      const link = page
        .locator(':is(#root, #storybook-root) > scale-link')
        .locator('a');
      await link.hover();
      await story.screenshot('hover.png');
      await link.focus();
      await story.screenshot('focus.png');
      await page.mouse.move(30, 30);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
