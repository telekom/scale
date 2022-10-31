describe('DataGrid', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-data-grid--standard', mode);
    });
    test.each([
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
    ])('%p', async (variant) => {
      await global.runSetup(`components-data-grid--${variant}`);

      await global.visualCheck();
    });
  });
});
