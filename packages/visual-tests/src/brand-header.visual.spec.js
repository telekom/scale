describe('Brand Header', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup(
        'components-brand-header-navigation--standard',
        mode
      );
    });
    it('default mega menu states', async () => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--standard&viewMode=story`
      );
      await global.page.waitForSelector('html.hydrated');

      const previewHtml = await global.page.$('body');
      await global.page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });
      const firstLink = await global.page.evaluateHandle(
        `document.querySelector("#root > div > scale-app-shell").shadowRoot.querySelector("scale-app-header nav.header__nav > div > div.header__nav-menu-wrapper > div.header__nav-menu-main > ul > scale-nav-main:nth-child(1) > li > a")`
      );
      await firstLink.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await firstLink.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });

    it('custom mega menu states', async () => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--custom-main-navigation&viewMode=story`
      );
      await global.page.waitForSelector('html.hydrated');

      const previewHtml = await global.page.$('body');
      await global.page.evaluate(() => {
        [
          '--telekom-motion-duration-immediate',
          '--telekom-motion-duration-transition',
          '--telekom-motion-duration-animation',
          '--telekom-motion-duration-animation-deliberate',
        ].forEach((transitionSpeed) => {
          document.body.style.setProperty(transitionSpeed, '0s');
        });
      });
      const firstLink = await global.page.evaluateHandle(
        `document.querySelector("#nav-main-with-mega-menu > li > a")`
      );
      await firstLink.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await firstLink.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });

    test.each([
      ['standard'],
      ['custom-main-navigation'],
      ['custom-icon-navigation'],
      ['custom-sector-navigation'],
      ['custom-addon-navigation'],
      ['custom-logo'],
    ])('%p', async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-brand-header-navigation--${variant}&viewMode=story`
      );
      await global.page.waitForSelector('html.hydrated');

      const previewHtml = await global.page.$('body');
      await global.page.evaluate(() => {
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
  });
});
