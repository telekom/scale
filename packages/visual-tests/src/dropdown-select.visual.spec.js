describe('DropdownSelect', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'beta-components-dropdown-select--standard',
        mode
      );
    });
    // screenshots of stories
    test.each([['standard'], ['disabled'], ['error']])(
      '%p',
      async (variant) => {
        await global.runSetup(`beta-components-dropdown-select--${variant}`);

        const select = await global.page.evaluateHandle(
          `document.querySelector("#root > div > scale-dropdown-select").shadowRoot.querySelector("#combobox")`
        );
        await global.visualCheck();
        await select.click();
        await global.visualCheck();
      }
    );
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`beta-components-dropdown-select--${variant}`);

      const select = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-dropdown-select").shadowRoot.querySelector("#combobox")`
      );
      await global.page.waitFor(300);
      await select.hover();
      await global.visualCheck();
      await select.focus();
      await global.visualCheck();
    });
  });
});
