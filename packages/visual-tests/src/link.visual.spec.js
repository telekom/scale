describe('Link', () => {
  test.each([['standard'], ['disabled'], ['with-icon']])(
    '%p',
    async (variant) => {
      await global.page.goto(
        `http://host.docker.internal:3123/iframe.html?id=components-link--${variant}&viewMode=story`
      );
      await page.waitForSelector('html.hydrated');
      const previewHtml = await page.$('body');
      expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    }
  );
  // hover, active, focus
  test.each([['with-icon']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-link--${variant}&viewMode=story`
    );

    await page.waitForSelector('html.hydrated');
    const previewHtml = await page.$('body');

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

