const { test } = require('./test-fixtures');
test.describe('Textarea', () => {
  for (const [variant] of [
    ['standard'],
    ['placeholder'],
    ['helper-text'],
    ['with-error'],
    ['disabled'],
    ['read-only'],
    ['max-length-with-counter'],
    ['more-rows'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-text-area--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-text-area--${variant}`);
      const textarea = page.locator('#input-textarea-0');
      await page.mouse.move(60, 40);
      await page.mouse.down();
      await story.screenshot('active.png');
      await page.keyboard.press('Tab');
      await textarea.hover();
      await story.screenshot('hover.png');
      await textarea.focus();
      await story.screenshot('focus.png');
    });
  }
});
