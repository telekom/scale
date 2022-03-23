describe('Pagination', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-pagination--standard&viewMode=story`
      );
      await page.evaluate((mode) => {
        localStorage.setItem('persistedColorMode', JSON.stringify(mode));
      }, mode);
    });
    test.each([
      ['standard'],
      ['small'],
      ['hidden-borders'],
      ['embedded-hidden-borders'],
    ])('%p', async (variant) => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-pagination--${variant}&viewMode=story`
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
    test('buttons disabled', async () => {
      await page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-pagination--standard&viewMode=story`
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
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
      );
      const lastButton = await page.evaluateHandle(
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__last-prompt")`
      );
      firstButton.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      lastButton.click();
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    });
    test.each([['small'], ['hidden-borders'], ['embedded-hidden-borders']])(
      '%p',
      async (variant) => {
        await page.goto(
          `http://host.docker.internal:3123/iframe.html?id=components-pagination--${variant}&viewMode=story`
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
          `document.querySelector("#root scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
        );
        const base = await page.evaluateHandle(
          `document.querySelector("#root")`
        );

        firstButton.hover();
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
        base.hover();
        firstButton.focus();
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
        await page.mouse.move(20, 30);
        await page.mouse.down();
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      }
    );
  });
});
