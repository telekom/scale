describe('Breadcrumb', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-breadcrumb--standard', mode);
    });
    test.each([['standard']])('%p', async variant => {
      await global.runSetup(`components-breadcrumb--${variant}`);

      const firstLink = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-breadcrumb").shadowRoot.querySelector("nav > ol > li:nth-child(1) > a")`
      );
      await global.visualCheck();
      await firstLink.hover();
      await global.visualCheck();
      // mouse down on firstlink
      await global.page.mouse.move(40, 30);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
