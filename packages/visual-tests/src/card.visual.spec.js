const { test, expect } = require('./test-fixtures');
test.describe('Card', () => {
  for (const [variant] of [['standard'], ['with-link'], ['with-image']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-card--${variant}`);
      const anchor = page.locator('scale-card').getByRole('link');
      await story.screenshot('default.png');
      if (variant === 'with-link' || variant === 'with-image') {
        await expect(anchor).toBeVisible();
        await anchor.hover();
        await story.screenshot('hover.png');
      }
    });
  }
});
