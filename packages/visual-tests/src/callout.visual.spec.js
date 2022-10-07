describe('Callout', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-callout--standard', mode);
    });
    test.each([
      ['standard'],
      ['primary'],
      ['black'],
      ['white'],
      ['blue'],
      ['medium'],
      ['large-and-small'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-callout--${variant}`);
      await global.page.waitFor(500);
      await global.visualCheck();
    });
  });
});
