describe('Pagination', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-pagination--standard', mode);
    });
    test.each([
      ['standard'],
      ['small'],
      ['hidden-borders'],
      ['embedded-hidden-borders'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-pagination--${variant}`);
      await global.visualCheck();
    });
    test('buttons disabled', async () => {
      await global.runSetup(`components-pagination--standard`);
      const firstButton = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
      );
      const lastButton = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__last-prompt")`
      );
      firstButton.click();
      await global.visualCheck();
      lastButton.click();
      await global.visualCheck();
    });
    test.each([['small'], ['hidden-borders'], ['embedded-hidden-borders']])(
      '%p',
      async (variant) => {
        await global.runSetup(`components-pagination--${variant}`);

        const firstButton = await global.page.evaluateHandle(
          `document.querySelector("#root scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
        );
        const base = await global.page.evaluateHandle(
          `document.querySelector("#root")`
        );

        firstButton.hover();
        await global.visualCheck();
        base.hover();
        firstButton.focus();
        await global.visualCheck();
        await global.page.mouse.move(20, 30);
        await global.page.mouse.down();
        await global.visualCheck();
      }
    );
  });
});
