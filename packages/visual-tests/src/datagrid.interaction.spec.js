const { test, expect } = require('./test-fixtures');

test('data grid selection updates rows and exports the public selection @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-data-grid--selection-export');

  const grid = page.locator('scale-data-grid');
  await grid.evaluate((element) => {
    element.fields = [
      { type: 'text', label: 'Customer' },
      { type: 'text', label: 'Status' },
    ];
    element.rows = [
      ['Updated customer', 'Active'],
      ['Another customer', 'Pending'],
    ];
  });
  await expect(
    grid.getByRole('columnheader', { name: 'Customer' })
  ).toBeVisible();

  let selectionPayload;
  await page.exposeFunction('recordDataGridSelection', (rows) => {
    selectionPayload = rows;
  });
  await grid.evaluate((element) => {
    element.addEventListener(
      'scale-selection',
      (event) =>
        window.recordDataGridSelection(
          event.detail.map((row) => row.slice(0, 2))
        ),
      { once: true }
    );
  });

  const firstRow = grid
    .getByRole('row')
    .filter({ hasText: 'Updated customer' });
  const selectionCheckbox = firstRow
    .locator('.tbody__cell--selection')
    .getByRole('checkbox');
  await expect(selectionCheckbox).not.toBeChecked();
  await firstRow.locator('.tbody__cell--selection label').click();

  await expect(selectionCheckbox).toBeChecked();
  await page.getByRole('button', { name: 'Export Selection!' }).click();
  await expect(page.locator('#aria-live')).toHaveText(
    '1 rows selected for export'
  );
  await expect
    .poll(() => selectionPayload)
    .toEqual([['Updated customer', 'Active']]);
});

test('data grid sorts the Name column with Enter and emits sorted rows @interaction', async ({
  page,
  story,
}) => {
  await story.open('components-data-grid--standard');

  const grid = page.locator('scale-data-grid');

  let sortPayload;
  await page.exposeFunction('recordDataGridSort', (detail) => {
    sortPayload = detail;
  });
  await grid.evaluate((element) => {
    element.addEventListener(
      'scale-sort',
      (event) =>
        window.recordDataGridSort({
          type: event.detail.type,
          sortDirection: event.detail.sortDirection,
          columnIndex: event.detail.columnIndex,
          rows: event.detail.rows.map((row) => row.slice(0, 2)),
        }),
      { once: true }
    );
  });

  const nameHeader = grid.getByRole('columnheader', { name: 'Name' });
  await nameHeader.focus();
  await expect(nameHeader).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
  await expect(grid.locator('tbody tr')).toHaveText([
    /Heidi/,
    /John/,
    /Mary/,
    /Muhammad/,
    /Patek/,
  ]);
  await expect
    .poll(() => sortPayload)
    .toEqual({
      type: 'text',
      sortDirection: 'ascending',
      columnIndex: 1,
      rows: [
        [4, 'Heidi'],
        [1, 'John'],
        [2, 'Mary'],
        [5, 'Muhammad'],
        [3, 'Patek'],
      ],
    });
});
