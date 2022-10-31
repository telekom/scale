describe('Icon', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-icon--standard', mode);
    });
    test.each([
      ['standard'],
      ['with-path-attribute'],
      ['with-name-attribute'],
      ['icon-library'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-icon--${variant}`);
      await global.visualCheck();
    });
  });
});
