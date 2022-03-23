describe('Menu', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['cascading-menu'],
      ['checked-toggle'],
      ['brand-header-primary-navigation'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
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
    // open menu on click
    test.each([['standard'], ['cascading-menu']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
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
      const button = await page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
      );
      await button.click();
      await page.waitFor(500);
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    // open 2nd and 3rd level of cascading menu on click
    // hover, active, focus
    test.each([['cascading-menu']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-flyout-menu--${variant}&viewMode=story`
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
      const button = await page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-button").shadowRoot.querySelector("button")`
      );
      const flyoutItemOne = await page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8)")`
      );
      const flyoutItemTwo = await page.evaluateHandle(
        `document.querySelector("#root scale-menu-flyout > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(8) > scale-menu-flyout-list > scale-menu-flyout-item:nth-child(2)")`
      );
      const base = await page.evaluateHandle(`document.querySelector("#root")`);
      await button.click();
      await page.waitFor(300);
      await flyoutItemOne.hover();
      await page.waitFor(300);
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await base.click();
      await button.click();
      await page.waitFor(300);
      await page.keyboard.press('ArrowDown');
      await page.waitFor(300);
      await page.keyboard.press('ArrowDown');
      await page.waitFor(300);
      await page.keyboard.press('ArrowDown');
      await page.waitFor(300);
      await page.keyboard.press('ArrowDown');
      await page.waitFor(300);
      await page.keyboard.press('ArrowDown');
      await page.waitFor(300);
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await flyoutItemOne.click();
      await page.waitFor(300);
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await flyoutItemTwo.focus();
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await flyoutItemTwo.click();
      await expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
