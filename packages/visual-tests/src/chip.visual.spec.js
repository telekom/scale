describe('Chip', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-chip--standard', mode);
    });
    test.each([
      ['standard'],
      ['icon'],
      ['dismissible'],
      ['disabled'],
      ['selected'],
      ['color-standard'],
      ['color-strong'],
      ['dismissible-selected'],
      ['change-action'],
      ['close-action'],
    ])('%p', async (variant) => {
      await global.runSetup(`beta-components-chip--${variant}`);
      await global.visualCheck();
    });
    test.each([
      ['standard', 'hover'],
      ['standard', 'active'],
      ['standard', 'focus'],
    ])('%p', async (variant, state) => {
      await global.runSetup(`beta-components-chip--${variant}`);
      await global.page.waitForSelector('html.hydrated');
      await global.page.$('body');
      const checkbox = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-chip")`
      );
      if (state === 'hover') {
        await checkbox.hover();
        await global.visualCheck();
      }
      if (state === 'active') {
        await global.page.mouse.move(20, 20);
        await global.page.mouse.down();
        await global.visualCheck();
      }
      if (state === 'focus') {
        await checkbox.focus();
        await global.visualCheck();
      }
    });
  });
});
