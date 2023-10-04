describe.skip('Deprecated ToggleGroup', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup(
        'deprecated-components-toggle-group--standard',
        mode
      );
    });
    test.each([
      ['standard'],
      ['monochrome-variant'],
      ['grey-background'],
      ['no-border'],
      ['small-size'],
      ['full-width'],
      ['single-select'],
      ['disabled'],
      ['icon-before'],
      ['icon-only'],
    ])('%p', async variant => {
      await global.runSetup(`deprecated-toggle-group--${variant}`);
      await global.page.waitFor(500);
      await global.visualCheck();
    });
    // hover, active, focus
    test.each([['standard'], ['monochrome-variant']])('%p', async variant => {
      await global.runSetup(`deprecated-toggle-group--${variant}`);
      const buttonOne = await global.page.evaluateHandle(
        `document.querySelector("#root scale-toggle-group > scale-toggle-button[radius='left']").shadowRoot.querySelector("button")`
      );
      const buttonThree = await global.page.evaluateHandle(
        `document.querySelector("#root scale-toggle-group > scale-toggle-button[radius='right']").shadowRoot.querySelector("button")`
      );
      buttonThree.hover();
      await global.visualCheck();
      buttonOne.hover();
      await global.visualCheck();
      buttonOne.focus();
      await global.visualCheck();
      await global.page.mouse.move(30, 30);
      await global.page.mouse.down();
      await global.visualCheck();
      await global.page.mouse.up();
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
