describe('TabNavigation', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-tab-navigation--standard', mode);
    });
    test.each([
      ['text-icon'],
      ['text-icon-small'],
      ['text-only'],
      ['text-only-small'],
      ['disabled-tabs'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-tab-navigation--${variant}`);
      await global.visualCheck();
    });
    // hover, focus, active
    test.each([['text-icon'], ['text-only']])('%p', async (variant) => {
      await global.runSetup(`components-tab-navigation--${variant}`);
      const tabHeader = await page.evaluateHandle(
        'document.querySelector("#scale-tab-header-1").shadowRoot.querySelector(".tab-header")'
      );
      await tabHeader.hover();
      await global.visualCheck();
      await tabHeader.click();
      await global.visualCheck();
      await page.mouse.move(20, 40);
      await page.mouse.down();
      await global.visualCheck();
    });
  });
});
