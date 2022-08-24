describe('Textfield', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-text-field--standard', mode);
    });
    test.each([
      ['standard'],
      ['placeholder'],
      ['helper-text'],
      ['with-error'],
      ['disabled'],
      ['read-only'],
      ['small'],
      ['max-length-with-counter'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-text-field--${variant}`);
      await global.visualCheck();
    });
    // hover, focus, active
    test.each([['standard']])('%p', async (variant) => {
      await global.runSetup(`components-text-field--${variant}`);

      const textfield = await page.evaluateHandle(
        'document.querySelector("#input-text-field0")'
      );
      await page.mouse.move(60, 40);
      await page.mouse.down();
      await global.visualCheck();
      await page.keyboard.press('Tab');
      await textfield.hover();
      await global.visualCheck();
      await textfield.focus();
      await global.visualCheck();
    });
  });
});
