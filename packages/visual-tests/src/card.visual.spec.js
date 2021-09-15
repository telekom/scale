describe('Card', () => {
  test.each([
    ['standard'],
    ['with-link'],
    ['with-image'],
    ['with-further-functions'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-card--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

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

    const previewHtml = await page.$('body');
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
