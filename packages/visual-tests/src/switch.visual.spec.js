describe('Switch', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-switch--standard', mode);
    });
    test.each([
      ['standard'],
      ['standard-disabled'],
      ['selected'],
      ['selected-disabled'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await global.visualCheck();
    });
    // hover, active
    test.each([['standard'], ['selected']])('%p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      const firstButton = await page.evaluateHandle(
        'document.querySelector("#root > scale-switch > div")'
      );
      await firstButton.hover();
      await global.visualCheck();
      await page.mouse.move(25, 25);
      await page.mouse.down();
      await global.visualCheck();
    });
    // focus
    test.each([['standard'], ['selected']])('%p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await page.keyboard.press('Tab');
      await global.visualCheck();
    });
    // click
    test.each([['standard'], ['selected']])('%p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      const firstButton = await page.evaluateHandle(
        'document.querySelector("#root > scale-switch > div .switch__wrapper")'
      );
      const base = await page.evaluateHandle(`document.querySelector("#root")`);
      await firstButton.click();
      await base.click();
      await global.visualCheck();
    });
  });
});
