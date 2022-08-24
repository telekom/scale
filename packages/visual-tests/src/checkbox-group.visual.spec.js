describe('CheckboxGroup', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-accordion--standard', mode);
    });
    test.each([
      ['standard'],
      ['checkbox-disabled'],
      ['group-error'],
      ['helper-text'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-checkbox-group--${variant}`);
      await global.page.waitFor(500);
      await global.visualCheck();
    });
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-checkbox-group--${variant}`);

      const firstCheckbox = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > input[type=checkbox]")`
      );
      const secondCheckbox = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(2) > input[type=checkbox]")`
      );
      const label = await page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > label")`
      );

      await label.hover();
      await global.visualCheck();
      await firstCheckbox.focus();
      await global.visualCheck();
      await page.mouse.move(20, 40);
      await page.mouse.down();
      await global.visualCheck();
    });
  });
});
