// FIXME
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
<<<<<<< HEAD
=======
      ['android'],
      ['android-disabled'],
      ['android-selected'],
      ['android-selected-disabled'],
>>>>>>> main
    ])('story %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await global.visualCheck();
    });
<<<<<<< HEAD
    // hover, active
    test.each([['standard'], ['selected']])('hover %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      const firstButton = await global.page.evaluateHandle(
        'document.querySelector("#root > scale-switch > div")'
      );
      await firstButton.hover();
      await global.visualCheck();
    });
    test.each([['standard'], ['selected']])('active %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      const firstButton = await global.page.evaluateHandle(
        'document.querySelector("#root > scale-switch > div")'
      );
      await global.page.mouse.move(25, 25);
      await global.page.mouse.down();
      await global.visualCheck();
    });
    // focus
    test.each([['standard'], ['selected']])('focus %p', async (variant) => {
=======
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
>>>>>>> main
      await global.runSetup(`components-switch--${variant}`);
      await global.page.keyboard.press('Tab');
      await global.page.waitFor(300);
      await global.visualCheck();
    });
<<<<<<< HEAD
    // click
    test.each([['standard'], ['selected']])('click %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      const firstButton = await global.page.evaluateHandle(
        'document.querySelector("#root > scale-switch > div .switch__wrapper")'
      );
      const base = await global.page.evaluateHandle(
        `document.querySelector("#root")`
      );
      await firstButton.click();
      await base.click();
      await global.visualCheck();
    });
=======
>>>>>>> main
  });
});
