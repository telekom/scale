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
      ['dynamic-standard'],
      ['dynamic-standard-selected'],
      ['dynamic-outline'],
      ['dynamic-outline-selected'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-chip--${variant}`);
      await global.visualCheck();
    });
  });
});
