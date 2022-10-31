describe('CheckboxGroup', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-checkbox-group--standard', mode);
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
      await global.page.waitForSelector('html.hydrated');
      await global.page.$('body');
      const firstCheckbox = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > input[type=checkbox]")`
      );
      const label = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox-group > scale-checkbox:nth-child(1) > label")`
      );

      await label.hover();
      await global.visualCheck();
      await firstCheckbox.focus();
      await global.visualCheck();
      await global.page.mouse.move(20, 40);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
