// FIXME
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
    ])('story %p', async (variant) => {
      await global.runSetup(`components-switch--${variant}`);
      await global.visualCheck();
    });
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
      await global.runSetup(`components-switch--${variant}`);
      await global.page.keyboard.press('Tab');
      await global.visualCheck();
    });
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
  });
});
