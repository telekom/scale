const { test } = require('./test-fixtures');
test.describe.skip('RadioButtonGroup', () => {
  for (const [variant] of [
    ['standard'],
    ['helper-text'],
    ['error'],
    ['disabled'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-radio-button-group--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-radio-button-group--${variant}`);
      const firstRadioButton = page.locator(
        ':is(#root, #storybook-root) > div > scale-radio-button-group > scale-radio-button:nth-child(1) input[type=radio]'
      );
      const label = page.locator(
        ':is(#root, #storybook-root) scale-radio-button-group > scale-radio-button:nth-child(1) > div > label'
      );
      const base = page.locator(':is(#root, #storybook-root)');
      await firstRadioButton.focus();
      await story.screenshot('focus.png');
      await base.click();
      await label.hover();
      await story.screenshot('hover.png');
      await base.click();
      await page.mouse.move(40, 70);
      await page.mouse.down();
      await story.screenshot('active.png');
      await firstRadioButton.click();
      await story.screenshot('selected.png');
    });
  }
});
