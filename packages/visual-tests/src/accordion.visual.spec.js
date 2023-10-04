describe('Accordion', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-accordion--standard', mode);
    });
    test.each([['standard'], ['dependent'], ['expanded'], ['heading-level']])(
      '%p',
      async (variant) => {
        await global.runSetup(`components-accordion--${variant}`);

        await global.visualCheck();
      }
    );
    test.each([['standard'], ['dependent']])('%p', async (variant) => {
      await global.runSetup(`components-accordion--${variant}`);

      const firstButton = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-accordion > scale-collapsible:nth-child(1)").shadowRoot.querySelector("div > h2 > button")`
      );
      await firstButton.hover();
      await global.visualCheck();
      // open first collapsible
      await firstButton.click();
      await global.visualCheck();
      // mouse down on first button
      await global.page.mouse.move(20, 60);
      await global.page.mouse.down();
      await global.visualCheck();
      await global.page.mouse.up();
      await global.page.mouse.move(0, 0);
      await firstButton.focus();
      await global.visualCheck();
    });
  });
});
