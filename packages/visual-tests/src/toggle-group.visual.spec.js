const { test } = require('./test-fixtures');
test.describe.skip('Deprecated ToggleGroup', () => {
  for (const [variant] of [
    ['standard'],
    ['monochrome-variant'],
    ['grey-background'],
    ['no-border'],
    ['small-size'],
    ['full-width'],
    ['single-select'],
    ['disabled'],
    ['icon-before'],
    ['icon-only'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`deprecated-toggle-group--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['monochrome-variant']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`deprecated-toggle-group--${variant}`);
      const buttonOne = page
        .locator(
          ":is(#root, #storybook-root) scale-toggle-group > scale-toggle-button[radius='left']"
        )
        .locator('button');
      const buttonThree = page
        .locator(
          ":is(#root, #storybook-root) scale-toggle-group > scale-toggle-button[radius='right']"
        )
        .locator('button');
      await buttonThree.hover();
      await story.screenshot('hover.png');
      await buttonOne.hover();
      await story.screenshot('hover-2.png');
      await buttonOne.focus();
      await story.screenshot('focus.png');
      await page.mouse.move(30, 30);
      await page.mouse.down();
      await story.screenshot('active.png');
      await page.mouse.up();
      await page.mouse.down();
      await story.screenshot('active-2.png');
    });
  }
});
