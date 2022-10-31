describe('ProgressBar', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-progress-bar--standard', mode);
    });
    test.each([
      ['standard'],
      ['description'],
      ['completed'],
      ['error'],
      ['interactive'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-progress-bar--${variant}`);

      await global.page.waitFor(3000);

      await global.visualCheck();
    });
  });
});
