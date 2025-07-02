describe('Checkbox', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-checkbox--standard', mode);
    });
    test.each([
      ['standard'],
      ['standard-disabled'],
      ['selected'],
      ['selected-disabled'],
      ['helper-text'],
      ['error'],
      ['custom-label'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-checkbox--${variant}`);
      await global.visualCheck();
    });
    test.each([
      ['standard', 'hover'],
      ['selected', 'hover'],
      ['custom-label', 'hover'],
      ['standard', 'active'],
      ['selected', 'active'],
      ['custom-label', 'active'],
      ['standard', 'focus'],
      ['selected', 'focus'],
      ['custom-label', 'focus'],
    ])('%p', async (variant, state) => {
      await global.runSetup(`components-checkbox--${variant}`);
      await global.page.waitForSelector('#root');
      await global.page.$('body');
      await global.page.waitForSelector('#root > scale-checkbox > label');
      const checkbox = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-checkbox > label")`
      );
      if (state === 'hover') {
        await checkbox.hover();
        await global.page.waitForTimeout(1000);
        await global.visualCheck();
      }
      if (state === 'active') {
        await global.page.mouse.move(20, 20);
        await global.page.mouse.down();
        await global.page.waitForTimeout(1000);
        await global.visualCheck();
      }
      if (state === 'focus') {
        await checkbox.focus();
        await global.page.waitForTimeout(1000);
        await global.visualCheck();
      }
    });
  });
});
