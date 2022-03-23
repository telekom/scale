describe('Card', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-card--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['with-link'],
      ['with-image'],
      ['with-further-functions'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-card--${variant}&viewMode=story`
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
      const anchor = await page.evaluateHandle(
        `document.querySelector("body scale-card").shadowRoot.querySelector("div > a")`
      );
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      // if no anchor is found an error object is returned
      if (anchor._remoteObject.className) {
        await anchor.hover();
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      }
    });
  });
});
