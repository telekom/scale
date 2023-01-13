describe('Chip', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-chip--standard', mode);
    });
    test.each([
      ['persistent-standard'],
      ['persistent-standard-selected'],
      ['persistent-standard-disabled'],
      ['persistent-standard-selected-disabled'],
      ['persistent-outline'],
      ['persistent-outline-selected'],
      ['persistent-outline-disabled'],
      ['persistent-outline-selected-disabled'],
      ['dynamic-suggestion'],
      ['dynamic-selection-standard'],
      ['dynamic-selection-outline'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-chip--${variant}`);
      await global.page.waitFor(3000);
      await global.visualCheck();
    });
  });
});
