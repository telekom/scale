describe('Tooltip', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-tooltip--standard', mode);
    });
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`beta-components-tooltip--${variant}`);
      const button = await global.page.evaluateHandle(
        'document.querySelector("#root > div > scale-tooltip > scale-button")'
      );
      await button.hover();
      await global.visualCheck();
    });
  });
});
