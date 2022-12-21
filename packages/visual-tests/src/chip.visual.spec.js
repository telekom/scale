describe('Chip', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-chip--standard', mode);
    });
    test.each([
      ['standard'],
      ['standard-selected'],
      ['standard-selected-disabled'],
      ['standard-dismissible'],
      ['outline'],
      ['outline-selected'],
      ['outline-selected-disabled'],
      ['outline-dismissible'],
      ['icon+text'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-chip--${variant}`);
      await global.visualCheck();
    });
  });
});
