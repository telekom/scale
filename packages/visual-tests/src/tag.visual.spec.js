describe('Tag', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-tag--standard', mode);
    });
    test.each([
      ['standard'],
      ['a-dissmisable-tag'],
      ['a-small-tag'],
      ['a-small-dismissable-tag'],
      ['disabled-dismissable-tag'],
      ['variant-secondary-tag'],
      ['variant-secondary-link'],
      ['variant-secondary-dismissable'],
      ['variant-secondary-small'],
      ['variant-secondary-dismissable-small'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-tag--${variant}`);
      await global.visualCheck();
    });
  });
});
