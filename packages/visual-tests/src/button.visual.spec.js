const { test } = require('./test-fixtures');
test.describe('Button', () => {
  for (const variant of [
    'standard',
    'secondary',
    'secondary-disabled',
    'secondary-white',
    'disabled',
    'with-icon-before',
    'with-icon-after',
    'icon-only',
    'link',
    'small-standard',
    'small-secondary',
    'small-secondary-disabled',
    'small-disabled',
    'small-with-icon-before',
    'small-with-icon-after',
    'small-icon-only',
    'small-link',
  ]) {
    test(variant, async ({ story }) => {
      await story.open(`components-button--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const variant of [
    'standard',
    'secondary',
    'with-icon-before',
    'icon-only',
  ]) {
    test(`${variant} interactions`, async ({ page, story }) => {
      await story.open(`components-button--${variant}`);
      const button = page.locator('scale-button').getByRole('button');
      await button.hover();
      await story.screenshot('hover.png');
      await page.mouse.down();
      await story.screenshot('active.png');
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await button.focus();
      await story.screenshot('focus.png');
    });
  }
});
