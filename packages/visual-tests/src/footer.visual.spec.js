describe('Footer', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-footer--standard', mode);
    });
    test.each([['standard'], ['minimal']])('%p', async (variant) => {
      await global.runSetup(`components-footer--${variant}`);
      await global.visualCheck();
    });
  });
});
