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
    test.each([['standard'], ['selected'], ['android-selected']])(
      'hover %p',
      async (variant) => {
        await global.runSetup(`components-switch--${variant}`);
        const firstButton = await global.page.evaluateHandle(
          'document.querySelector("#root scale-switch")'
        );
        await firstButton.hover();
        await global.visualCheck();
      }
    );

    test.each([['standard']])('focus %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await global.page.keyboard.press('Tab');
      await global.page.waitFor(300);
      await global.visualCheck();
    });
  });
});
