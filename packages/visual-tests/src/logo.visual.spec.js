describe('Logo', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-logo--standard', mode);
    });
    test.each([['standard'], ['white'], ['sizing'], ['link']])(
      '%p',
      async variant => {
        await global.runSetup(`components-logo--${variant}`);
        await global.visualCheck();
        const image = await global.page.evaluateHandle(
          `document.querySelector("#root scale-logo").shadowRoot.querySelector("svg")`
        );
        await image.focus();
        await global.visualCheck();
      }
    );
  });
});
