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

      const link = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-link").shadowRoot.querySelector("a")`
      );
      link.hover();
      await global.visualCheck();
      link.focus();
      await global.visualCheck();
      await global.page.mouse.move(30, 30);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
