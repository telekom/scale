describe.skip('SidebarNavigation', () => {
  describe.each(['light', 'dark'])('%p', mode => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-sidebar-navigation--standard',
        mode
      );
    });
    test.each([
      ['standard'],
      ['active-on-level-1'],
      ['active-on-level-2'],
      ['custom-media-query'],
    ])('%p', async variant => {
      await global.runSetup(`components-sidebar-navigation--${variant}`);
      await global.visualCheck();
    });
    test.each([['standard']])('%p', async variant => {
      await global.runSetup(`components-sidebar-navigation--${variant}`);

      const collabsibleButton = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2) > scale-sidebar-nav-collapsible:nth-child(1)").shadowRoot.querySelector("li > div > a")`
      );
      const secondItem = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)").shadowRoot.querySelector("li > div > a")`
      );

      await collabsibleButton.click();
      await global.visualCheck();

      await secondItem.click();
      await global.visualCheck();
    });
  });
  // hover, active, focus SidebarNavItem
  describe('SidebarNavItem', () => {
    test.each([['standard']])('%p', async variant => {
      await global.runSetup(`components-sidebar-navigation--${variant}`);
      const sidebarNavItem = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-item:nth-child(1) > a")`
      );
      const base = await global.page.evaluateHandle(
        `document.querySelector("#root")`
      );

      await sidebarNavItem.focus();
      await global.visualCheck();
      await base.click();

      await sidebarNavItem.hover();
      await global.visualCheck();

      await global.page.mouse.move(20, 50);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
  // hover, active, focus SidebarNavCollapsible
  describe('SidebarNavCollapsible', () => {
    test.each([['standard']])('%p', async variant => {
      await global.runSetup(`components-sidebar-navigation--${variant}`);

      const sidebarNavCollapsible = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)").shadowRoot.querySelector("li > div > a")`
      );
      const base = await global.page.evaluateHandle(
        `document.querySelector("#root")`
      );

      await sidebarNavCollapsible.focus();
      await global.visualCheck();
      await base.click();

      await sidebarNavCollapsible.hover();
      await global.visualCheck();

      await global.page.mouse.move(20, 100);
      await global.page.mouse.down();
      await global.visualCheck();
    });
  });
});
