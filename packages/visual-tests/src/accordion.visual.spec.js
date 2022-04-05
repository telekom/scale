describe('Accordion', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([['standard'], ['dependent'], ['expanded'], ['heading-level']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=components-accordion--${variant}&viewMode=story`
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
    test.each([['standard'], ['dependent']])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-accordion--${variant}&viewMode=story`
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
      const firstButton = await page.evaluateHandle(
        `document.querySelector("#root > scale-accordion > scale-collapsible:nth-child(1)").shadowRoot.querySelector("div > h2 > button")`
      );
      await firstButton.hover();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      // open first collapsible
      await firstButton.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      // mouse down on first button
      await page.mouse.move(20, 60);
      await page.mouse.down();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await firstButton.focus();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
  });
});
