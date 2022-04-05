describe('SidebarNavigation', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['active-on-level-1'],
      ['active-on-level-2'],
      ['custom-media-query'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      await page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });

      const collabsibleButton = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2) > scale-sidebar-nav-collapsible:nth-child(1)").shadowRoot.querySelector("li > div > a")`
      );
      const secondItem = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)").shadowRoot.querySelector("li > div > a")`
      );

      await collabsibleButton.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();

      await secondItem.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
  // hover, active, focus SidebarNavItem
  describe('SidebarNavItem', () => {
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const sidebarNavItem = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-item:nth-child(1) > a")`
      );
      const base = await page.evaluateHandle(`document.querySelector("#root")`);
      const previewHtml = await page.$('body');

      await sidebarNavItem.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await base.click();

      await sidebarNavItem.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();

      await page.mouse.move(20, 50);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
  // hover, active, focus SidebarNavCollapsible
  describe('SidebarNavCollapsible', () => {
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-sidebar-navigation--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const sidebarNavCollapsible = await page.evaluateHandle(
        `document.querySelector("#root > div > scale-sidebar-nav > scale-sidebar-nav-collapsible:nth-child(2)").shadowRoot.querySelector("li > div > a")`
      );
      const base = await page.evaluateHandle(`document.querySelector("#root")`);
      const previewHtml = await page.$('body');

      await sidebarNavCollapsible.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await base.click();

      await sidebarNavCollapsible.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();

      await page.mouse.move(20, 100);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
