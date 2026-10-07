const { test } = require('./test-fixtures');
test.describe('Slider', () => {
  for (const [variant] of [
    ['standard'],
    ['range'],
    ['step-marks'],
    ['helper-text'],
    ['disabled'],
    ['platform-i-os'],
    ['platform-android'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-slider--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} hover`, async ({ page, story }) => {
      await story.open(`components-slider--${variant}`);
      const slider = page
        .locator(':is(#root, #storybook-root) > scale-slider')
        .locator('#slider-0');
      await slider.hover();
      await story.screenshot('hover.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} focus`, async ({ page, story }) => {
      await story.open(`components-slider--${variant}`);
      const slider = page
        .locator(':is(#root, #storybook-root) > scale-slider')
        .locator('#slider-0');
      await slider.focus();
      await story.screenshot('focus.png');
    });
  }
});
