describe('Tooltip', () => {
  test.each([['standard']])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=beta-components-tooltip--${variant}&viewMode=story`
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

    const button = await page.evaluateHandle(
      'document.querySelector("#root > div > scale-tooltip > scale-button")'
    );
    await button.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
