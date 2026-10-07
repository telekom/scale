const { test } = require('./test-fixtures');
test.describe('Table', () => {
  for (const [variant] of [
    ['standard'],
    ['with-sorting-icons'],
    ['with-striped-rows'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-table--${variant}`);
      await story.screenshot('default.png');
    });
  }
  for (const [variant] of [['standard']]) {
    test(`${variant} hover`, async ({ page, story }) => {
      await story.open(`components-table--${variant}`);
      const row = page.locator('#sortable-table > tbody > tr:nth-child(3)');
      await row.hover();
      await story.screenshot('hover.png');
    });
  }
});
