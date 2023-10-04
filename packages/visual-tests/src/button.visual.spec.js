describe('Button', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup('components-accordion--standard', mode);
    });
    test.each([
      ['standard'],
      ['secondary'],
      ['secondary-disabled'],
      ['secondary-white'],
      ['disabled'],
      ['with-icon-before'],
      ['with-icon-after'],
      ['icon-only'],
      ['link'],
      ['small-standard'],
      ['small-secondary'],
      ['small-secondary-disabled'],
      ['small-disabled'],
      ['small-with-icon-before'],
      ['small-with-icon-after'],
      ['small-icon-only'],
      ['small-link'],
    ])('%p', async variant => {
      await global.runSetup(`components-button--${variant}`);

      const button = await global.page.evaluateHandle(
        `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
      );
      await global.visualCheck();
    });
  });
  // hover, active, focus
  describe('Button', () => {
    test.each([
      ['standard'],
      ['secondary'],
      ['with-icon-before'],
      ['icon-only'],
    ])('%p', async variant => {
      await global.runSetup(`components-button--${variant}`);

      const button = await global.page.evaluateHandle(
        `document.querySelector("#root scale-button").shadowRoot.querySelector(".button")`
      );
      await button.hover();
      await global.visualCheck();
      await global.page.mouse.move(20, 20);
      await global.page.mouse.down();
      await global.visualCheck();
      await global.page.mouse.up();
      await global.page.mouse.move(0, 0);
      await button.focus();
      await global.visualCheck();
    });
  });
});
