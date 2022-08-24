describe('Dropdown', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-dropdown--standard', mode);
    });
    // screenshots of stories
    test.each([
      ['standard'],
      ['small'],
      ['disabled'],
      ['error'],
      ['with-custom-icon'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-dropdown--${variant}`);
      await global.page.waitFor(1000);
      await global.visualCheck();
    });
    // hover, active, focus
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-dropdown--${variant}`);

      const dropdown = await page.evaluateHandle(
        `document.querySelector("#root > scale-dropdown .input__dropdown")`
      );
      await global.page.waitFor(300);
      await dropdown.hover();
      await global.visualCheck();
      await dropdown.focus();
      await global.visualCheck();
      await page.mouse.move(60, 60);
      await page.mouse.down();
      await global.visualCheck();
    });
  });
});
