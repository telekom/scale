const { test } = require('./test-fixtures');
test.describe('Logo', () => {
  for (const [variant] of [['standard'], ['white'], ['sizing'], ['link']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-logo--${variant}`);
      await story.screenshot('default.png');
      const image = page
        .locator(':is(#root, #storybook-root) scale-logo')
        .locator('svg');
      await image.focus();
      await story.screenshot('focus.png');
    });
  }
});
