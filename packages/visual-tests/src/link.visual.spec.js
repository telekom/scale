describe('Link', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-link--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([['standard'], ['disabled'], ['with-icon']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=components-link--${variant}&viewMode=story`
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
      }
    );
    // hover, active, focus
    test.each([['with-icon']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-link--${variant}&viewMode=story`
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
      const link = await page.evaluateHandle(
        `document.querySelector("#root > scale-link").shadowRoot.querySelector("a")`
      );
      link.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      link.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.move(30, 30);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
