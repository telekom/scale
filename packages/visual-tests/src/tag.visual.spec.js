describe('Tag', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-tag--standard', mode);
    });
    test.each([
      ['standard'],
      ['dismissable-tag'],
      ['small-tag'],
      ['small-dismissable-tag'],
      ['disabled-dismissable-tag'],
      ['colors'],
      ['color-standard-tag'],
      ['color-strong-tag'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-tag--${variant}`);
      await global.visualCheck();
    });
  });
});
