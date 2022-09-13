describe('Card', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-card--standard', mode);
    });
    test.each([
      ['standard'],
      ['movable'],
      ['action-icon'],
      ['action-checkbox'],
      ['full-width-image-and-headline'],
      ['asset-headline-and-subline'],
      ['centered-image-and-headline'],
      ['with-interactive-icons'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-card--${variant}`);
      await global.visualCheck();
    });
  });
});
