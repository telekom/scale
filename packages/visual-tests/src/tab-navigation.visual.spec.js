describe('TabNavigation', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['text-icon'],
      ['text-icon-small'],
      ['text-only'],
      ['text-only-small'],
      ['disabled-tabs'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
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
    // hover, focus, active
    test.each([['text-icon'], ['text-only']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
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
      const tabHeader = await page.evaluateHandle(
        'document.querySelector("#scale-tab-header-1").shadowRoot.querySelector(".tab-header")'
      );
      await tabHeader.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await tabHeader.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(20, 40);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
