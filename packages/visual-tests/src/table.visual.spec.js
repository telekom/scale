describe('Table', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-table--standard', mode);
    });
    test.each([
      ['standard'],
      ['small'],
      ['with-sorting-icons'],
      ['with-striped-rows'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-table--${variant}`);
      await global.page.waitFor(5000);
      await global.visualCheck();
    });
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-table--${variant}`);
      await global.page.waitFor(5000);
      const row = await global.page.evaluateHandle(
        'document.querySelector("#sortable-table > tbody > tr:nth-child(3)")'
      );
      row.hover();
      await global.visualCheck();
    });
  });
});
