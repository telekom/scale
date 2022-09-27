describe('Icon Button', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('beta-components-icon-button--standard', mode);
    });
    test.each([
      ['standard'],
      ['selected'],
      ['active'],
      ['active-selected'],
      ['small'],
      ['small-selected'],
      ['small-active'],
      ['small-active-selected'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-icon-button--${variant}`);
      await global.visualCheck();
    });
  });
});
