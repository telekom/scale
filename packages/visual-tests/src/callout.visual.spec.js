describe('Callout', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-callout--standard', mode);
    });
    test.each([
      ['standard'],
      ['size'],
      ['rotation'],
      ['variants'],
      ['asterisk'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-callout--${variant}`);
      await global.visualCheck();
    });
  });
});
