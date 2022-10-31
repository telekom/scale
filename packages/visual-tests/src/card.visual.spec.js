describe('Card', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-card--standard', mode);
    });
    test.each([
      ['standard'],
      ['with-link'],
      ['with-image'],
      ['with-further-functions'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-card--${variant}`);

      const anchor = await global.page.evaluateHandle(
        `document.querySelector("body scale-card").shadowRoot.querySelector("div > a")`
      );
      await global.visualCheck();
      // if no anchor is found an error object is returned
      if (anchor._remoteObject.className) {
        await anchor.hover();
        await global.visualCheck();
      }
    });
  });
});
