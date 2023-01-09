describe('SegmentedButton', () => {
    describe.each(['light', 'dark'])('%p', (mode) => {
      beforeAll(async () => {
        await global.runColorSetup('components-segmented-button--standard', mode);
      });
      test.each([
        ['standard'],
        ['multi-select'],
        ['disabled-button'],
        ['disabled-button-group'],
        ['icon-only'],
        ['icon-and-text'],
        ['invalid'],
      ])('%p', async (variant) => {
        await global.runSetup(`beta-components-segmented-button--${variant}`);
        await global.visualCheck();
      });
    });
  });