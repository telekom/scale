describe('Divider', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-divider--standard', mode);
    });
    test.each([['standard'], ['vertical']])('%p', async variant => {
      await global.runSetup(`components-divider--${variant}`);
      await global.visualCheck();
    });
  });
});
