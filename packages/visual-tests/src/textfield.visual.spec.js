const { test } = require('./test-fixtures');
test.describe('Textfield', () => {
  for (const [variant] of [
    ['standard'],
    ['placeholder'],
    ['helper-text'],
    ['with-error'],
    ['with-success'],
    ['with-warning'],
    ['disabled'],
    ['read-only'],
    ['max-length-with-counter'],
  ]) {
    test(`${variant}`, async ({ story }) => {
      await story.open(`components-text-field--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-text-field--${variant}`);
      const textfield = page.locator('#input-text-field-0');
      await page.mouse.move(60, 40);
      await page.mouse.down();
      await story.screenshot('active.png');
      await page.mouse.up();
      await page.keyboard.press('Tab');
      await textfield.hover();
      await story.screenshot('hover.png');
      await textfield.focus();
      await story.screenshot('focus.png');
    });
  }
});
