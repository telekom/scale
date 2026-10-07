const { test, expect } = require('./test-fixtures');
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
      await expect(
        page.locator('scale-data-grid .data-grid__auto-width-check')
      ).toHaveCount(0);
      await story.screenshot('default.png');
    });
  }
});
