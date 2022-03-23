describe('Breadcrumb', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-breadcrumb--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([['standard']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-breadcrumb--${variant}&viewMode=story`
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
      const firstLink = await page.evaluateHandle(
        `document.querySelector("#root > scale-breadcrumb").shadowRoot.querySelector("nav > ol > li:nth-child(1) > a")`
      );
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await firstLink.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      // mouse down on firstlink
      await page.mouse.move(40, 30);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
