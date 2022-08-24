describe('Link', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-link--standard', mode);
    });
    test.each([['standard'], ['disabled'], ['with-icon']])(
      '%p',
      async (variant) => {
        await global.runSetup(`components-link--${variant}`);

        await global.visualCheck();
      }
    );
    // hover, active, focus
    test.each([['with-icon']])('%p', async (variant) => {
      await global.runSetup(`components-link--${variant}`);

      const link = await page.evaluateHandle(
        `document.querySelector("#root > scale-link").shadowRoot.querySelector("a")`
      );
      link.hover();
      await global.visualCheck();
      link.focus();
      await global.visualCheck();
      await page.mouse.move(30, 30);
      await page.mouse.down();
      await global.visualCheck();
    });
  });
});
