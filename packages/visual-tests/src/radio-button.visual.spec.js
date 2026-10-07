const { test } = require('./test-fixtures');
test.describe.skip('RadioButton', () => {
  for (const [variant] of [
    ['standard'],
    ['standard-disabled'],
    ['selected'],
    ['selected-disabled'],
    ['helper-text'],
    ['error'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-radio-button--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['selected']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-radio-button--${variant}`);
      const radioButtonWrapper = page.locator(
        ':is(#root, #storybook-root) > scale-radio-button > div'
      );
      const radioButton = page.locator(
        ':is(#root, #storybook-root) > scale-radio-button > div > input'
      );
      await radioButton.focus();
      await story.screenshot('focus.png');
      await radioButtonWrapper.hover();
      await story.screenshot('hover.png');
      await page.mouse.move(20, 20);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
