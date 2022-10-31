describe('Menu', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-flyout-menu--standard', mode);
    });
    test.each([
      ['standard'],
      ['cascading-menu'],
      ['checked-toggle'],
      ['brand-header-primary-navigation'],
    ])('%p', async (variant) => {
      await global.runSetup(`components-flyout-menu--${variant}`);
      await global.visualCheck();
    });
    // open menu on click
    test.each([['standard'], ['cascading-menu']])('%p', async (variant) => {
      await global.runSetup(`components-flyout-menu--${variant}`);
      await global.page.waitForSelector('html.hydrated');
      await global.page.$('body');
      const button = await global.page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
      );
      await button.click();
      await global.page.waitFor(500);
      await global.visualCheck();
    });
    // open 2nd and 3rd level of cascading menu on click
    // hover, active, focus
    test.each([['cascading-menu']])('%p', async (variant) => {
      await global.runSetup(`components-flyout-menu--${variant}`);
      await global.page.waitForSelector('html.hydrated');
      await global.page.$('body');
      const button = await global.page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
      );
      const flyoutItemOne = await global.page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8)")`
      );
      const flyoutItemTwo = await global.page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8) > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(2)")`
      );
      const base = await global.page.evaluateHandle(
        `document.querySelector("#root")`
      );
      await button.click();
      await global.page.waitFor(300);
      await flyoutItemOne.hover();
      await global.page.waitFor(300);
      await global.visualCheck();
      await base.click();
      await button.click();
      await global.page.waitFor(300);
      await global.page.keyboard.press('ArrowDown');
      await global.page.waitFor(300);
      await global.page.keyboard.press('ArrowDown');
      await global.page.waitFor(300);
      await global.page.keyboard.press('ArrowDown');
      await global.page.waitFor(300);
      await global.page.keyboard.press('ArrowDown');
      await global.page.waitFor(300);
      await global.page.keyboard.press('ArrowDown');
      await global.page.waitFor(300);
      await global.visualCheck();
      await flyoutItemOne.click();
      await global.page.waitFor(300);
      await global.visualCheck();
      await flyoutItemTwo.focus();
      await global.visualCheck();
      await flyoutItemTwo.click();
      await global.visualCheck();
    });
  });
});
