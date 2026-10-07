const { test, expect } = require('./test-fixtures');
test.describe('Tooltip', () => {
  for (const [variant] of [['standard']]) {
    test(`${variant} hover`, async ({ page, story }) => {
      await story.open(`components-tooltip--${variant}`);
      const button = page.locator(
        ':is(#root, #storybook-root) > div > scale-tooltip > scale-button'
      );
      await button.hover();
      await expect(page.locator('scale-tooltip')).toHaveAttribute('opened', '');
      await expect(page.getByRole('tooltip')).toBeVisible();
      await story.screenshot('hover.png');
    });
  }
});
