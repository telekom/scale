describe('Pagination', () => {
  test.each([
    ['standard'],
    ['small'],
    ['hidden-borders'],
    ['embedded-hidden-borders'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-pagination--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  test('buttons disabled', async () => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-pagination--standard&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');
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
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=beta-components-pagination--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');

      await page.evaluate(() => {
        const transitions = [
          '--scl-motion-duration-immediate',
          '--scl-motion-duration-fast',
          '--scl-motion-duration-slower',
          '--scl-motion-duration-deliberate',
        ];

        transitions.forEach((transitionSpeed) => {
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
