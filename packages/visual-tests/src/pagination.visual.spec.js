describe('Pagination', () => {
  describe.each(['light', 'dark'])('%p', (mode) => {
    beforeAll(async () => {
      await global.runColorSetup('components-pagination--standard', mode);
    });
    test.each([['standard'], ['hidden-borders'], ['embedded-hidden-borders']])(
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
        expect(await previewHtml.screenshot()).toMatchImageSnapshot();
      }
    );
    test('buttons disabled', async () => {
      await global.runSetup(`components-pagination--standard`);
      await global.page.waitForSelector('html.hydrated'); // I don't know what I'm doing
      const firstButton = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
      );
      const lastButton = await global.page.evaluateHandle(
        `document.querySelector("#root > scale-pagination").shadowRoot.querySelector("div > button.pagination__last-prompt")`
      );
      firstButton.click();
      await global.visualCheck();
      lastButton.click();
      await global.visualCheck();
    });
    test.each([['hidden-borders'], ['embedded-hidden-borders']])(
      '%p',
      async (variant) => {
        await global.runSetup(`components-pagination--${variant}`);

        const firstButton = await global.page.evaluateHandle(
          `document.querySelector("#root scale-pagination").shadowRoot.querySelector("div > button.pagination__first-prompt")`
        );
        const base = await global.page.evaluateHandle(
          `document.querySelector("#root")`
        );

        firstButton.hover();
        await global.visualCheck();
        base.hover();
        firstButton.focus();
        await global.visualCheck();
        await global.page.mouse.move(20, 30);
        await global.page.mouse.down();
        await global.visualCheck();
      }
    );
  });
});
