const { test } = require('./test-fixtures');
test.describe('TabNavigation', () => {
  for (const [variant] of [
    ['text-icon'],
    ['text-only'],
    ['disabled-tabs'],
    ['large-text-only'],
    ['large-text-icon'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-tab-navigation--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['text-icon'], ['text-only']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-tab-navigation--${variant}`);
      const tabHeader = page
        .locator('#scale-tab-header-1')
        .locator('.tab-header');
      await tabHeader.hover();
      await story.screenshot('hover.png');
      await tabHeader.click();
      await story.screenshot('selected.png');
      await page.mouse.move(20, 40);
      await page.mouse.down();
      await story.screenshot('active.png');
    });
  }
});
