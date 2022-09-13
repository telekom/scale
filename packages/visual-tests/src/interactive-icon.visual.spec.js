describe('Interactive Icon', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'beta-components-interactive-icon--standard',
        mode
      );
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
      await global.runSetup(`beta-components-interactive-icon--${variant}`);
      await global.visualCheck();
    });
  });
});
