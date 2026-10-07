const { test } = require('./test-fixtures');
test.describe('RatingStars', () => {
  for (const [variant] of [
    ['info-text-and-custom-label'],
    ['disabled'],
    ['small'],
    ['hidden-label'],
    ['readonly'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-rating-stars--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['info-text-and-custom-label']]) {
    test(`${variant} active`, async ({ page, story }) => {
      await story.open(`components-rating-stars--${variant}`);
      const input = page
        .locator(':is(#root, #storybook-root) > scale-rating-stars')
        .locator('input[type=range]');
      await page.mouse.move(40, 60);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
