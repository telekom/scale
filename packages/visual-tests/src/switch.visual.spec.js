describe('Switch', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-switch--standard', mode);
    });
    test.each([
      ['standard'],
      ['small'],
      ['standard-disabled'],
      ['selected'],
      ['selected-disabled'],
      ['android'],
      ['android-disabled'],
      ['android-selected'],
      ['android-selected-disabled'],
    ])('story %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await global.visualCheck();
    });
    test.each([['standard'], ['selected'], ['android'], ['android-selected']])(
      'hover %p',
      async (variant) => {
        await global.runSetup(`components-switch--${variant}`);
        const firstButton = await global.page.evaluateHandle(
          'document.querySelector("#root scale-switch")'
        );
        await firstButton.hover();
        await page.waitFor(600);
        await global.visualCheck();
      }
    );
    test.each([['standard'], ['selected'], ['android'], ['android-selected']])(
      'active %p',
      async (variant) => {
        await global.runSetup(`components-switch--${variant}`);
        await global.page.mouse.move(25, 25);
        await global.page.mouse.down();
        await page.waitFor(600);
        await global.visualCheck();
      }
    );
    test.each([['standard'], ['selected'], ['android'], ['android-selected']])(
      'focus %p',
      async (variant) => {
        await global.runSetup(`components-switch--${variant}`);
        await global.page.keyboard.press('Tab');
        await page.waitFor(600);
        await global.visualCheck();
      }
    );
  });
});
