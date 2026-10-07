const { test } = require('./test-fixtures');
test.describe('Accordion', () => {
  for (const [variant] of [
    ['standard'],
    ['dependent'],
    ['expanded'],
    ['heading-level'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-accordion--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard'], ['dependent']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-accordion--${variant}`);
      const firstButton = page
        .locator(
          ':is(#root, #storybook-root) > scale-accordion > scale-collapsible:nth-child(1)'
        )
        .locator('div > h2 > button');
      await firstButton.hover();
      await story.screenshot('hover.png');
      await firstButton.click();
      await story.screenshot('selected.png');
      await page.mouse.move(20, 60);
      await page.mouse.down();
      await story.screenshot('active.png');
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await firstButton.focus();
      await story.screenshot('focus.png');
    });
  }
});
