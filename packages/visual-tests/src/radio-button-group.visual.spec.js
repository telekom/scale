describe('RadioButtonGroup', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-radio-button-group--standard',
        mode
      );
    });
    test.each([['standard'], ['helper-text'], ['error'], ['disabled']])(
      '%p',
      async (variant) => {
        await global.runSetup(`components-radio-button-group--${variant}`);

        await global.visualCheck();
      }
    );
    // focus, hover, active, click
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-radio-button-group--${variant}`);
      const firstRadioButton = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-radio-button-group > scale-radio-button:nth-child(1) input[type=radio]")`
      );
      const label = await global.page.evaluateHandle(
        `document.querySelector("#root scale-radio-button-group > scale-radio-button:nth-child(1) > div > label")`
      );
      const base = await global.page.evaluateHandle(
        `document.querySelector("#root")`
      );

      await firstRadioButton.focus();
      await global.visualCheck();
      await base.click();
      await label.hover();
      await global.visualCheck();
      await base.click();
      await global.page.mouse.move(40, 70);
      await global.page.mouse.down();
      await global.visualCheck();
      await firstRadioButton.click();
      await global.visualCheck();
    });
  });
});
