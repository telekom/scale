describe('Footer', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup(
        'deprecated-components-footer--standard',
        mode
      );
    });
    test.each([['standard'], ['minimal']])('%p', async variant => {
      await global.runSetup(`deprecated-components-footer--${variant}`);
      await global.visualCheck();
    });
  });
});
