describe('TabNavigation', () => {
  test.each([
    ['text-icon'],
    ['text-icon-small'],
    ['text-only'],
    ['text-only-small'],
    ['disabled-tabs'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
    );
    await page.waitForSelector('html.hydrated');

    const previewHtml = await page.$('body');

    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
  // hover, focus, active
  test.each([
    ['text-icon'],
    ['text-only'],
  ])('%p', async (variant) => {
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-tab-navigation--${variant}&viewMode=story`
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

    const tabHeader = await page.evaluateHandle(
      'document.querySelector("#scale-tab-header-1").shadowRoot.querySelector(".tab-header")'
    );
    await tabHeader.hover();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await tabHeader.click();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(20, 40);
    await page.mouse.down();
    expect(await previewHtml.screenshot()).toMatchImageSnapshot();
  });
});
