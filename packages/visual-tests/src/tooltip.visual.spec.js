describe('Tooltip', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-tooltip--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-tooltip--${variant}&viewMode=story`
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
        'document.querySelector("#root > div > scale-tooltip > scale-button")'
      );
      await button.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
