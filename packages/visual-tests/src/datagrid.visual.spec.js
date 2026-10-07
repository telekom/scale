const { test } = require('./test-fixtures');
test.describe('DataGrid', () => {
  for (const [variant] of [
    ['email-cell'],
    ['date-cell'],
    ['html-cell'],
    ['number-cell'],
    ['select-cell'],
    ['text-cell'],
    ['heading'],
    ['hide-extras'],
    ['pagination'],
    ['column-stretch'],
    ['tags-cell'],
    ['telephone-cell'],
    ['selection-export'],
  ]) {
    test(`${variant}`, async ({ page, story }) => {
      await story.open(`components-data-grid--${variant}`);
      await page.locator('scale-data-grid').evaluate((grid) => {
        grid.rows = [...grid.rows];
      });
      await story.screenshot('default.png');
    });
  }
});
