const { test, expect } = require('./test-fixtures');
test.describe('DatePicker', () => {
  for (const [variant] of [['standard']]) {
    test(`${variant} selected`, async ({ page, story }) => {
      await story.open(`components-date-picker--${variant}`);
      const openButton = page.locator(
        ':is(#root, #storybook-root) > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > button'
      );
      await openButton.click();
      await expect(page.locator('.duet-date__dialog')).toBeVisible();
      await story.screenshot('selected.png');
    });
  }
  for (const [variant] of [
    ['standard'],
    ['helper-text'],
    ['with-error'],
    ['disabled'],
    ['date-range-picker'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-date-picker--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} states`, async ({ page, story }) => {
      await story.open(`components-date-picker--${variant}`);
      const datePicker = page.locator(
        ':is(#root, #storybook-root) > div > scale-date-picker > div > duet-date-picker > div > div.duet-date__input-wrapper > .duet-date__input'
      );
      await datePicker.hover();
      await story.screenshot('hover.png');
      await datePicker.focus();
      await story.screenshot('focus.png');
    });
  }
});
